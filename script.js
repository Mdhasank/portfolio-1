document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      
        // Scroll-up button show/hide script
        if (window.scrollY > 500) {
            document.querySelector('.scroll-up-btn').classList.add("show");
        } else {
            document.querySelector('.scroll-up-btn').classList.remove("show");
        }
    });

    // Slide-up script
    document.querySelector('.scroll-up-btn').addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Removing smooth scroll on slide-up button click
        document.documentElement.style.scrollBehavior = "auto";
    });

    // smooth scroll behavior on menu items
    document.querySelector('.navbar .menu li a').forEach(function(anchor) {
        anchor.addEventListener("click", function() {
            document.documentElement.style.scrollBehavior = "smooth";
        });
    });

});
    // Toggle menu/navbar
    document.querySelector('#menu-btn').addEventListener("click", function() {
        console.log('click');
        document.querySelector('.navbar .menu').classList.toggle("active");
        document.querySelector('.menu-btn i').classList.toggle("active");
    });
    document.querySelectorAll('.navbar .menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.navbar .menu').classList.remove('active');
            document.querySelector('.menu-btn i').classList.toggle("active");
        });
    });
    

// ---- typing animation
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

// --------- For Theme Color
function setTheme(theme) {
    document.body.className = theme;
}

// stats
let hasScrolled = false;

function startCounter() {
    const projectsCounter = document.getElementById('projects-counter');
    const clientsCounter = document.getElementById('clients-counter');
    const experienceCounter = document.getElementById('experience-counter');

    let projects = 0;
    let clients = 0;
    let experience = 0;

    const projectsTarget = 37;
    const clientsTarget = 34;
    const experienceTarget = 5;

    const incrementCounters = () => {
        if (projects < projectsTarget) {
            projects += 1;
            projectsCounter.textContent = projects;
        }
        if (clients < clientsTarget) {
            clients += 1;
            clientsCounter.textContent = clients;
        }
        if (experience < experienceTarget) {
            experience += 1;
            experienceCounter.textContent = experience;
        }
    };

    const interval = setInterval(() => {
        incrementCounters();
        if (projects >= projectsTarget && clients >= clientsTarget && experience >= experienceTarget) {
            clearInterval(interval);
        }
    }, 60);
}

const section = document.getElementById('stats');
window.addEventListener('scroll', () => {
    if (!hasScrolled && isInViewport(section)) {
        startCounter();
        hasScrolled = true;
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
