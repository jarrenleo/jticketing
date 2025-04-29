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
    return null;
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
    return [];
  }

  return data;
}

export async function checkTicketAvailability(id, price, num_sets) {
  const { data, error } = await supabase.rpc("check_ticket_availability", {
    p_id: id,
    p_price: price,
    p_num_sets: num_sets,
  });

  if (error) {
    console.error(
      `Error checking tickets availability for ticket ID ${id}:`,
      error,
    );
    return null;
  }

  if (!data) return null;

  return data[0];
}

export async function updateTicketInventory(ticketId, quantityPurchased) {
  const { error } = await supabase.rpc("update_ticket_inventory", {
    p_id: ticketId,
    p_quantity: quantityPurchased,
  });

  if (error) {
    console.error(
      `Error updating inventory for ticket ID ${ticketId} by ${quantityPurchased}:`,
      error,
    );
    return null;
  }

  return true;
}
