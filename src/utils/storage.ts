import { supabase } from '../services/supabaseClient';

export const getPublicStorageUrl = (storagePath?: string | null) => {
  if (!storagePath) {
    return '';
  }

  const normalizedStoragePath = storagePath.startsWith('/')
    ? storagePath.slice(1)
    : storagePath;
  const [bucket, ...pathParts] = normalizedStoragePath.split('/');

  if (!bucket || pathParts.length === 0) {
    return '';
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(pathParts.join('/'));
  return data.publicUrl;
};
