 


// Text to display in the "About Us" section
const aboutText = `We are the RJ College Entrepreneurship Cell, dedicated to fostering innovation and leadership among students. We believe in empowering creative minds, providing a platform for students to bring their entrepreneurial dreams to life. Our mission is to nurture talent, drive innovation, and help students make a positive impact on society.`;

// Function to type out the text
function typeEffect(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Start typing effect when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const aboutTextElement = document.getElementById("about-text");
    typeEffect(aboutTextElement, aboutText, 50); // Adjust speed (50ms) if needed
});
