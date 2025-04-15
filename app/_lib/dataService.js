import supabase from "./supabase";

export async function getEvents() {
  const { data, error } = await supabase.rpc("get_events");

  // Change the way errors are handled
  // Should send error message to the frontend
  if (error) {
    console.error("Error fetching event data:", error);
    return [];
  }

  return data;
}

export async function getEvent(slug) {
  const { data, error } = await supabase.rpc("get_event", {
    p_slug: slug,
  });

  if (error) {
    console.error(`Error fetching event for slug "${slug}":`, error);
    // Consider more robust error handling, maybe re-throwing the error
    // or returning an object indicating an error state
    return null; // Return null on error for now
  }

  if (!data) return null;

  return data[0];
}

export async function getEventTickets(slug) {
  const { data, error } = await supabase.rpc("get_event_tickets", {
    p_slug: slug,
  });

  if (error) {
    console.error(`Error fetching tickets for slug "${slug}":`, error);
    // Consider more robust error handling, maybe re-throwing the error
    // or returning an object indicating an error state
    return []; // Return empty array on error for now
  }

  return data;
}
