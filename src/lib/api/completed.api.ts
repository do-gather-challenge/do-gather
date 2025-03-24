'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const fetchCreateChallengeCompleted = async (challengeId: number) => {
  const supabase = createClient();
  const { error } = await supabase.from('challenge_completions').insert({ challenge_id: challengeId });
  if (error) throw error;
  revalidatePath(`/challenges/${challengeId}`);
};
