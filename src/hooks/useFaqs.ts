import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export type Faq = {
  id: number;
  question: string;
  answer: string;
  is_published: boolean;
  display_order: number | null;
};

type UseFaqsState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; error: string }
  | { status: "success"; data: Faq[] };

  export function useFaqs(): UseFaqsState {
    const [state, setState] = useState<UseFaqsState>({ status: "loading" });
  
    useEffect(() => {
      let active = true;
  
      (async () => {
        const { data, error } = await supabase
          .from("faqs")
          .select("*")
          .eq("is_published", true)
          .order("display_order", { ascending: true });
  
        if (!active) return;
  
        if (error) {
          setState({ status: "error", error: error.message });
          return;
        }
        if (!data || data.length === 0) {
          setState({ status: "empty" });
          return;
        }
        setState({ status: "success", data: data as Faq[] });
      })();
  
      return () => {
        active = false;
      };
    }, []);
  
    return state;
  }
  