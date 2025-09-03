const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        
        const { data } = req.body;

        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false, // [cite: 26]
                message: "Invalid input: The 'data' key with an array is required."
            });
        }

       
        const user_id = "john_doe_17091999";  
        const email = "john@xyz.com"; 
        const roll_number = "ABCD123"; 

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = Number(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(num); 
                } else {
                    odd_numbers.push(num); 
                }
            }
            else if (typeof item === 'string' && /^[a-zA-Z]/.test(item)) {
                alphabets.push(item.toUpperCase()); 
            }
            else {
                special_characters.push(item); 
            }
        });

        // Logic for the concatenated string 
        // 1. Join all items, filter for only alphabetic chars, and split into an array
        const all_alpha_chars = data.join('').replace(/[^a-zA-Z]/g, '').split('');
        // 2. Reverse the array of characters
        const reversed_chars = all_alpha_chars.reverse();
        // 3. Apply alternating caps and join to form the final string
        const concat_string = reversed_chars.map((char, index) =>
            index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        ).join('');

       
        const response = {
            is_success: true, 
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(), 
            concat_string: concat_string
        };
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            message: "An internal server error occurred.",
            error: error.message
        });
    }
});


app.get('/', (req, res) => {
    res.status(200).send('API is active. Please use POST on the /bfhl endpoint.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});