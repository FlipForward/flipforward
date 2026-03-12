import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { type, data } = await req.json()

    let to: string
    let subject: string
    let html: string

    if (type === 'new_request_admin') {
      // Notify admin about new website request
      to = 'finnvangronsveld@gmail.com'
      subject = `Nieuwe website-aanvraag: ${data.subject}`
      html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f4f4f5; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; color: #18181b;">🆕 Nieuwe Website-aanvraag</h2>
            <p style="margin: 0 0 8px; color: #52525b;"><strong>Onderwerp:</strong> ${data.subject}</p>
            <p style="margin: 0 0 8px; color: #52525b;"><strong>Van:</strong> ${data.user_email || 'Onbekend'}</p>
            <p style="margin: 0 0 16px; color: #52525b;"><strong>Ingediend:</strong> ${new Date().toLocaleString('nl-BE')}</p>
            <div style="background: white; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; color: #18181b; white-space: pre-wrap;">${data.description}</p>
            </div>
          </div>
          <p style="color: #a1a1aa; font-size: 12px; text-align: center;">FlipForward Admin Notificatie</p>
        </div>
      `
    } else if (type === 'status_update_client') {
      // Notify client about status change
      to = data.user_email
      const statusLabels: Record<string, string> = {
        open: 'Open',
        in_progress: 'In behandeling',
        closed: 'Gesloten',
      }
      subject = `Update: je aanvraag "${data.subject}" is nu ${statusLabels[data.status] || data.status}`
      html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f4f4f5; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; color: #18181b;">📋 Update van je aanvraag</h2>
            <p style="margin: 0 0 8px; color: #52525b;"><strong>Onderwerp:</strong> ${data.subject}</p>
            <p style="margin: 0 0 16px; color: #52525b;"><strong>Status:</strong> ${statusLabels[data.status] || data.status}</p>
            ${data.admin_reply ? `
              <div style="background: white; border-radius: 8px; padding: 16px; margin-top: 12px;">
                <p style="margin: 0 0 4px; font-weight: 600; color: #18181b;">Antwoord van FlipForward:</p>
                <p style="margin: 0; color: #52525b; white-space: pre-wrap;">${data.admin_reply}</p>
              </div>
            ` : ''}
          </div>
          <p style="color: #a1a1aa; font-size: 12px; text-align: center;">FlipForward · <a href="https://flipforward.lovable.app/dashboard" style="color: #ef4444;">Bekijk je dashboard</a></p>
        </div>
      `
    } else {
      return new Response(JSON.stringify({ error: 'Unknown notification type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Enqueue the email
    const messageId = crypto.randomUUID()
    const { error } = await supabase.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to,
        from: 'FlipForward <noreply@notify.flipforward.be>',
        sender_domain: 'notify.flipforward.be',
        subject,
        html,
        purpose: 'transactional',
        label: type,
        queued_at: new Date().toISOString(),
      },
    })

    if (error) {
      console.error('Failed to enqueue email', error)
      return new Response(JSON.stringify({ error: 'Failed to enqueue email' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, message_id: messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
