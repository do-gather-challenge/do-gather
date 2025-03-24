'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const fetchGetParticipant = async ({ challengeId, userId }: { challengeId: number; userId: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('participants')
    .select()
    .eq('challenge_id', challengeId)
    .eq('user_id', userId);
  if (error) throw error;

  return { isParticipating: data.length === 1 };
};

export const fetchCreateParticipant = async ({ challengeId, userId }: { challengeId: number; userId: string }) => {
  const supabase = createClient();
  const { error } = await supabase.from('participants').insert({ challenge_id: challengeId, user_id: userId });
  if (error) throw error;
  revalidatePath(`/challenges/${challengeId}`);
};

export const fetchDeleteParticipant = async ({ challengeId, userId }: { challengeId: number; userId: string }) => {
  const supabase = createClient();
  const { error } = await supabase.from('participants').delete().eq('challenge_id', challengeId).eq('user_id', userId);
  if (error) throw error;
  revalidatePath(`/challenges/${challengeId}`);
};
