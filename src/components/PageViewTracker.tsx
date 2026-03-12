import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    supabase.from('page_views').insert({
      page: location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
