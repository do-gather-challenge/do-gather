'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const fetchCreateParticipant = async (challengeId: number) => {
  const supabase = createClient();
  const { error } = await supabase.from('participants').insert({ challenge_id: challengeId });
  if (error) throw error;
  revalidatePath(`/challenges/${challengeId}`);
};

export const fetchDeleteParticipant = async (challengeId: number, userId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from('participants').delete().eq('challenge_id', challengeId).eq('user_id', userId);
  if (error) throw error;
  revalidatePath(`/challenges/${challengeId}`);
};
