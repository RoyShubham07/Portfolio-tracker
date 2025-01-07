import express from 'express';
import asyncHandler from 'express-async-handler';
import { supabase } from '../db.js';

const router = express.Router();

// Get all stocks
router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('stocks')
    .select('*');

  if (error) throw error;
  res.json(data);
}));

// Add new stock
router.post('/', asyncHandler(async (req, res) => {
  const { symbol, name, quantity, buyPrice } = req.body;
  
  const { data, error } = await supabase
    .from('stocks')
    .insert([{ symbol, name, quantity, buyPrice }])
    .select()
    .single();

  if (error) throw error;
  res.status(201).json(data);
}));

// Update stock
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { symbol, name, quantity, buyPrice } = req.body;

  const { data, error } = await supabase
    .from('stocks')
    .update({ symbol, name, quantity, buyPrice })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  res.json(data);
}));

// Delete stock
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('stocks')
    .delete()
    .eq('id', id);

  if (error) throw error;
  res.status(204).send();
}));

export default router;