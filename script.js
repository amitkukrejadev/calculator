// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Grab references to the expression and result display elements
    const expressionElement = document.getElementById('expression');
    const resultElement = document.getElementById('result');
    let expression = ''; // holds the current expression to evaluate
    let result = ''; // holds the current result

    // Attach a click event listener to each button in the calculator
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            // Clear all inputs and results
            if (value === 'clear') {
                expression = '';
                result = '';
                updateDisplay();
            } 
            // Delete the last character in the expression
            else if (value === 'del') {
                expression = expression.slice(0, -1);
                updateDisplay();
            } 
            // Calculate the result of the current expression
            else if (value === '=') {
                try {
                    result = eval(expression.replace(/x/g, '*').replace(/÷/g, '/'));
                } catch (e) {
                    result = 'Error'; // Catch and display errors in calculation
                }
                updateDisplay();
            } 
            // Use the last result as part of the next expression
            else if (value === 'ans') {
                expression += result;
                updateDisplay();
            } 
            // Toggle between positive and negative
            else if (value === '±') {
                expression = expression.startsWith('-') ? expression.slice(1) : '-' + expression;
                updateDisplay();
            } 
            // Calculate the square root of the current expression
            else if (value === 'sqrt') {
                try {
                    result = Math.sqrt(eval(expression));
                } catch (e) {
                    result = 'Error';
                }
                updateDisplay();
            } 
            // Append the value of the pressed button to the expression
            else {
                expression += value;
                updateDisplay();
            }
        });
    });

    // Function to update the expression and result displays
    function updateDisplay() {
        expressionElement.textContent = expression;
        resultElement.textContent = result;
    }
});
