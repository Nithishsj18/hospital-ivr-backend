const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

app.post('/voice', (req, res) => {
  res.type('text/xml');
  res.send(`
    <Response>
      <Gather numDigits="1" action="/handle-key" method="POST" timeout="10">
        <Say voice="alice">
          Welcome to City Hospital Appointment System.
          Press 1 to book an appointment.
          Press 2 to check your appointment.
          Press 3 to cancel an appointment.
        </Say>
      </Gather>
      <Say>We did not receive any input. Goodbye.</Say>
    </Response>
  `);
});

app.post('/handle-key', (req, res) => {
  const digit = req.body.Digits;
  res.type('text/xml');

  if (digit === '1') {
    res.send(`<Response><Say>You chose to book an appointment.</Say></Response>`);
  } else if (digit === '2') {
    res.send(`<Response><Say>You chose to check your appointment.</Say></Response>`);
  } else if (digit === '3') {
    res.send(`<Response><Say>You chose to cancel an appointment.</Say></Response>`);
  } else {
    res.send(`<Response><Say>Invalid option. Goodbye.</Say></Response>`);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
