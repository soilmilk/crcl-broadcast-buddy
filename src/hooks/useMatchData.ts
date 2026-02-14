import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MatchData, DEFAULT_MATCH_DATA } from "@/lib/matchTypes";

export function useMatchData(matchId: string) {
  const [data, setData] = useState<MatchData>(DEFAULT_MATCH_DATA);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchMatch = async () => {
      const { data: row } = await supabase
        .from("matches")
        .select("data")
        .eq("id", matchId)
        .maybeSingle();

      if (row?.data) {
        setData(row.data as unknown as MatchData);
      }
      setLoading(false);
    };

    fetchMatch();
  }, [matchId]);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel(`match-${matchId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "matches",
          filter: `id=eq.${matchId}`,
        },
        (payload) => {
          if (payload.new?.data) {
            setData(payload.new.data as unknown as MatchData);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  const updateMatch = useCallback(
    async (newData: MatchData) => {
      setData(newData);
      await supabase
        .from("matches")
        .upsert([{ id: matchId, data: newData as any, updated_at: new Date().toISOString() }]);
    },
    [matchId]
  );

  return { data, loading, updateMatch };
}
