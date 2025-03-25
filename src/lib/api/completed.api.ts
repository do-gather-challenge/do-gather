'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const fetchCreateChallengeCompleted = async (challengeId: number) => {
  const supabase = createClient();
  await supabase.from('challenge_completions').insert({ challenge_id: challengeId });
  revalidatePath(`/challenges/${challengeId}`);
};
