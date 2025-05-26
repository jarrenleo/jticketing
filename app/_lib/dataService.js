import supabase from "./supabase";

export async function getEvents() {
  const { data, error } = await supabase.rpc("get_events");
  if (error) return { data: null, error: error.message };

  const availableEvents = data.filter((event) => event.is_available);
  const availableEventsSortedByDate = availableEvents.sort(
    (a, b) => new Date(a.opening_date) - new Date(b.opening_date),
  );

  return { data: availableEventsSortedByDate };
}

export async function getEvent(slug) {
  const { data, error } = await supabase.rpc("get_event", {
    p_slug: slug,
  });
  if (error) return { data: null, error: error.message };

  const eventData = data[0];
  if (!eventData.is_available)
    return { data: null, error: "Event unavailable for sale" };

  return { data: eventData };
}

export async function getReviews() {
  const { data, error } = await supabase.rpc("get_reviews");
  if (error) return { data: null, error: error.message };

  const reviews = data.reverse();

  return { data: reviews };
}

export async function getEventTickets(slug) {
  const { data, error } = await supabase.rpc("get_event_tickets", {
    p_slug: slug,
  });
  if (error) return { data: null, error: error.message };

  return { data };
}

export async function checkTicketAvailability(id, price, num_sets) {
  const { data, error } = await supabase.rpc("check_ticket_availability", {
    p_id: id,
    p_price: price,
    p_num_sets: num_sets,
  });
  if (error) return { data: null, error: error.message };

  return { data: data[0] };
}

export async function updateTicketInventory(ticketId, quantityPurchased) {
  const { error } = await supabase.rpc("update_ticket_inventory", {
    p_id: ticketId,
    p_quantity: quantityPurchased,
  });

  if (error) return { error: error.message };
}
