const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const sdk = require('api')(process.env.BAMBOO_SDK);
sdk.auth(process.env.BAMBOO_KEY);

app.use(cors());
app.use(express.json());

app.use('/employees/create-new', async (req, res) => {
    const { firstName, lastName, employeeNumber, city } = req.body;

    if (!firstName) return res.json({ status: 404, message: 'Missing first name' });
    if (!lastName) return res.json({ status: 404, message: 'Missing last name' });

    try {
        const employeeCreated = await sdk['add-employee']({ 
            firstName,
            lastName,
            employeeNumber,
            city
        }, { companyDomain: process.env.ORG_NAME});
        
        return res.json({ success: true, message: employeeCreated });
    } catch (error) {
        return res.json({ success: false, message: error });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Connected and listening on port ${PORT} 🔥`));