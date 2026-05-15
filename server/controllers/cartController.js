// Cart is currently persisted on the client (localStorage via CartContext).
// These endpoints exist for future server-side cart persistence.

const getCart = async (req, res) => {
  res.json({ cart: [], message: 'Cart is managed client-side via localStorage.' });
};

const syncCart = async (req, res) => {
  res.json({ ok: true, cart: req.body.cart || [] });
};

module.exports = { getCart, syncCart };
