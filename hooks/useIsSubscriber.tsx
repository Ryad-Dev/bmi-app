// // hooks/useIsSubscriber.tsx
// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { supabase } from "../lib/supabase";
// import { RealtimeChannel } from "@supabase/supabase-js";

// export function useIsSubscriber() {
//   const [isSubscriber, setIsSubscriber] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkSubscription = useCallback(async () => {
//     console.log("🔍 checkSubscription START");
    
//     try {
//       setLoading(true);
//       const { data: { session } } = await supabase.auth.getSession();
      
//       if (!session?.user?.id) {
//         console.log("❌ Pas connecté");
//         setIsSubscriber(false);
//         setLoading(false);
//         return;
//       }

//       console.log("✅ Session OK, userId:", session.user.id);

//       const { data, error } = await supabase
//         .from('utilisateurs')
//         .select('abonne, date_expiration')
//         .eq('userId', session.user.id)
//         .single();

//       console.log("📊 DB RESULT:", { data, error: error?.message });

//       if (error || !data) {
//         console.log("❌ DB ERROR:", error?.message);
//         setIsSubscriber(false);
//       } else {
//         const now = new Date();
//         const expiration = data.date_expiration ? new Date(data.date_expiration) : null;
//         const isActive = data.abonne && (!expiration || expiration > now);
//         console.log("✅ isActive:", isActive, "abonne:", data.abonne, "expiration:", data.date_expiration);
//         setIsSubscriber(isActive);
//       }
//     } catch (error) {
//       console.log("💥 CATCH ERROR:", error);
//       setIsSubscriber(false);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ✅ REALTIME + AUTH LISTENER
//   useEffect(() => {
//     // 1. Check initial
//     checkSubscription();

//     // 2. Écoute auth changes (login/logout)
//     const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log("🔥 Auth event:", event);
//         await checkSubscription();
//       }
//     );

//     // 3. Realtime sur table utilisateurs (TON user seulement)
//     let realtimeChannel: RealtimeChannel | null = null;
//     const initRealtime = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user?.id) {
//         realtimeChannel = supabase.channel(`subscriber-${session.user.id}`);
//         realtimeChannel
//           .on('postgres_changes', 
//             { 
//               event: '*', 
//               schema: 'public', 
//               table: 'utilisateurs',
//               filter: `userId=eq.${session.user.id}`
//             }, 
//             (payload) => {
//               console.log("🔄 REALTIME UPDATE:", payload);
//               checkSubscription();
//             }
//           )
//           .subscribe((status) => {
//             console.log("📡 Realtime status:", status);
//           });
//       }
//     };

//     // Lance realtime après 1s
//     const timeout = setTimeout(initRealtime, 1000);

//     // Cleanup
//     return () => {
//       clearTimeout(timeout);
//       if (realtimeChannel) {
//         supabase.removeChannel(realtimeChannel);
//       }
//       authListener?.unsubscribe();
//     };
//   }, [checkSubscription]);

//   return { isSubscriber, loading, checkSubscription };
// }
