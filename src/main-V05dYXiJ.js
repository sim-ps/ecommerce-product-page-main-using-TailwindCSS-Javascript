//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/main.js
function onClickToggle(trigger, target) {
	document.querySelector(trigger).addEventListener("click", () => {
		document.querySelector(target).classList.toggle("invisible");
	});
}
function onClickCounter(minusBtn, plusBtn, addToCart, quantity, displayBadge, min = 0) {
	let count = 0;
	let amount = document.querySelector("#amount").textContent;
	document.querySelector("#totalAmount").textContent;
	const update = () => {
		document.querySelector(`p${quantity}`).textContent = count;
		document.querySelector(addToCart).addEventListener("click", () => {
			document.querySelector("span.display").textContent = count;
			document.querySelector(displayBadge).textContent = count;
			if (count > 0) {
				document.querySelector("#hasItems").classList.remove("invisible");
				document.querySelector("#isEmpty").classList.add("invisible");
				document.querySelector(displayBadge).classList.remove("invisible");
			} else {
				document.querySelector("#hasItems").classList.add("invisible");
				document.querySelector("#isEmpty").classList.remove("invisible");
				document.querySelector(displayBadge).classList.add("invisible");
			}
			document.querySelector("#totalAmount").textContent = `$${amount * count}`;
		});
	};
	document.querySelector(plusBtn).addEventListener("click", () => {
		count++;
		update();
	});
	document.querySelector(minusBtn).addEventListener("click", () => {
		if (count > min) {
			count--;
			update();
		}
	});
}
onClickToggle("#cart-icon", "#cart");
onClickToggle("#cart-icon-mobile", "#cart");
onClickCounter("#minus", "#plus", "#addToCart", ".display", "#display-badge");
onClickCounter("#minus-mobile", "#plus-mobile", "#addToCart-mobile", ".display-mobile", "#display-badge-mobile");
console.log(document.querySelectorAll(".display-mobile"));
document.querySelector("#productGallery").addEventListener("click", () => {
	document.querySelector("#productLightBox").classList.remove("invisible");
});
document.querySelector("#closeBtn").addEventListener("click", () => {
	document.querySelector("#productLightBox").classList.add("invisible");
});
var images = [
	"./images/image-product-1.jpg",
	"./images/image-product-2.jpg",
	"./images/image-product-3.jpg",
	"./images/image-product-4.jpg"
];
var current = 0;
document.querySelector("#next").addEventListener("click", () => {
	current = (current + 1) % images.length;
	document.querySelector("#mainLightBox").src = images[current];
});
document.querySelector("#previous").addEventListener("click", () => {
	current = (current - 1 + images.length) % images.length;
	document.querySelector("#mainLightBox").src = images[current];
});
document.querySelector("#next-mobile").addEventListener("click", () => {
	current = (current + 1) % images.length;
	document.querySelector("#mainLightBox-mobile").src = images[current];
});
document.querySelector("#previous-mobile").addEventListener("click", () => {
	current = (current - 1 + images.length) % images.length;
	document.querySelector("#mainLightBox-mobile").src = images[current];
});
document.querySelectorAll(".thumbLightBox").forEach((thumb, index) => {
	thumb.addEventListener("click", () => {
		current = index;
		document.querySelector("#mainLightBox").src = images[current];
	});
});
document.querySelector("#closeBtn-nav").addEventListener("click", () => {
	document.querySelector("#nav-mobile-menu").classList.add("invisible");
});
document.querySelector("#nav-mobile-menu-btn").addEventListener("click", () => {
	document.querySelector("#nav-mobile-menu").classList.remove("invisible");
});
//#endregion
