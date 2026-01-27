        document.getElementById("toc-header").addEventListener("click", function() {
            var content = document.getElementById("toc-content");
            var toggle = document.getElementById("toc-toggle");
            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
                toggle.textContent = "-";
            } else {
                content.style.display = "none";
                toggle.textContent = "+";
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });