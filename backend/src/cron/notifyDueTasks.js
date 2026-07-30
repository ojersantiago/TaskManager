const cron = require('node-cron');
const nodemailer = require('nodemailer');
const pool = require('../db/db');
require('dotenv').config();

// Configuración del email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Se ejecuta todos los días a las 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Revisando tareas por vencer...');

  try {
    // Buscar tareas que vencen mañana y no están completadas
    const result = await pool.query(`
      SELECT tasks.*, users.email, users.name 
      FROM tasks 
      JOIN users ON tasks.user_id = users.id
      WHERE tasks.due_date = CURRENT_DATE + INTERVAL '1 day'
      AND tasks.completed = false
    `);

    for (const task of result.rows) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: task.email,
        subject: '⚠️ Tu tarea vence mañana',
        html: `
          <h2>Hola ${task.name}!</h2>
          <p>Te recordamos que la siguiente tarea vence mañana:</p>
          <h3>${task.title}</h3>
          <p>${task.description || ''}</p>
          <p>No te olvides de completarla!</p>
        `
      });

      console.log(`Email enviado a ${task.email} por tarea: ${task.title}`);
    }

  } catch (error) {
    console.error('Error en el cron:', error.message);
  }
});