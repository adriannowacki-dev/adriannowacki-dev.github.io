gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.to(".hero__name--firstname", {
  duration: 1,
  xPercent: -100,
  ease: "linear",
  scrollTrigger: {
    trigger: ".hero__name",
    start: "0",
    end: "bottom center",
    scrub: true
  }
});

gsap.to(".hero__name--lastname", {
  duration: 1,
  xPercent: 100,
  ease: "linear",
  scrollTrigger: {
    trigger: ".hero__name",
    start: "0",
    end: "bottom center",
    scrub: true
  }
});

gsap.to(".storyline__trigger", {
  text: {
    value: "In a world where everyone has a voice",
    newClass: "storyline__trigger--changed"
  },
  scrollTrigger: {
    trigger: ".storyline__trigger",
    start: "top 75%",
    end: "bottom center",
    scrub: 1,
  }
});

const firstParagraph = document.querySelector(".storyline__wrapper");
console.log(firstParagraph.offsetWidth)

function getScrollAmount() {
	let racesWidth = firstParagraph.scrollWidth;
	return -(racesWidth - window.innerWidth);
}

const tween = gsap.to(firstParagraph, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});


ScrollTrigger.create({
	trigger:".storyline__container",
	start:"top 40%",
	end: () => `+=${getScrollAmount() * -1}`,
	pin:true,
	animation:tween,
	scrub:1,
	invalidateOnRefresh:true,
});