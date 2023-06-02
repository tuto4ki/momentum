const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greeting');
const NAME = document.querySelector('.name');
const BODY = document.body;
let randomNum = getRandomNum();
const SLIDE_NEXT = document.querySelector('.slide-next');
const SLIDE_PREV = document.querySelector('.slide-prev');
const WEATHER_ICON = document.querySelector('.weather-icon');
const TEMPERATURE = document.querySelector('.temperature');
const WEATHER_DESCRIPTION = document.querySelector('.weather-description');
const WEATHER_CITY = document.querySelector('.city');
const WEATHER_ERROR = document.querySelector('.weather-error');
const URL_JSON = "./assets/json/data.json";
const QUOTE = document.querySelector('.quote');
const AUTHOR = document.querySelector('.author');
const CHANGE_QUOTE = document.querySelector('.change-quote');
let dataQuote = [];
const PLAY = document.querySelector('.play');
const PLAY_PREV = document.querySelector('.play-prev');
const PLAY_NEXT = document.querySelector('.play-next');
let isPlay = false;
const AUDIO = new Audio();
let playNum = 0;
let playNumOld = 0;
import playList from './playList.js';
import greetingTranslation from './greetingTranslation.js';
let language;
let bgSource = 1;
const PLAY_LIST = document.querySelector('.play-list');
const PROGRESS_ACTIVE = document.querySelector('#progress-active');
const DURATION_PLAYER = document.querySelector('.duration-player');
const DURATION_TIMER = document.querySelector('.duration-timer');
const TITLE_PLAYER = document.querySelector('.title-player');
const INPUT_SONG = document.querySelector('.input-song');
const SONG_ICON = document.querySelector('.song-icon');
const PLAY_ITEMS = document.querySelectorAll('.play-item');
const SELECT_LANGUAGE = document.querySelector('#language');
const LABEL_LANG = document.querySelector('.label-language');
const LABEL_BG = document.querySelector('.label-background');
const SELECT_BG = document.querySelector('#source-background');
const TAGS = document.querySelector('.label-tags');
const TAGS_INPUT = document.querySelector('.input-tags');
const SETTINGS_BTN = document.querySelector('.settings-icon');
const SETTINGS = document.querySelector('.footer-shadow');
let tagsUser = '';
const LINKS_BTN = document.querySelector('.links-button');
const LINKS_WND = document.querySelector('.links-shadow');
const TITLE_SHOW = document.querySelector('.title-show');
const ADD_LINK_BTN = document.querySelector('.new-link');
const NO_LINKS_TITLE = document.querySelector('.title-no-links');
const NAME_LINK_LBL = document.querySelector('.name-link-label');
const EMAIL_LINK_LBL = document.querySelector('.email-link-label');
let links = [];
let listSection = {'time' : [document.querySelector('.time-label'), document.querySelector('#time-input'), TIME],
					'date-text' : [document.querySelector('.date-label'), document.querySelector('#date-input'), DATE],
					'greetings' : [document.querySelector('.greetings-label'), document.querySelector('#greetings-input'), document.querySelector('.greeting-container')],
					'quote' : [document.querySelector('.quote-label'), document.querySelector('#quote-input'), document.querySelector('.quote-footer')],
					'weather' : [document.querySelector('.weather-label'), document.querySelector('#weather-input'), document.querySelector('.weather')],
					'player' : [document.querySelector('.player-label'), document.querySelector('#player-input'), document.querySelector('.player')],
					'links' : [document.querySelector('.functional-label'), document.querySelector('#functional-input'), document.querySelector('.footer-links')]
				};

const LIST_LINK = document.querySelector('.list-link');
const ADD_LINK = document.querySelector('.add-link')
const PREV_LINK = document.querySelector('.prev-link');
const ADD_NEW_LINK_BTN = document.querySelector('.add-link-btn');
const EDIT_LINK_BTN = document.querySelector('.edit-link-btn');
const NAME_LINK_INPT = document.querySelector('#name-link');
const EMAIL_LINK_INPT = document.querySelector('#email-link');
const MY_LINK = document.querySelector('.my-links');
const LINKS_UL = document.querySelector('.links-ul');
const NEW_LINK_DIV = document.querySelector('.new-link-div');
let linkShadowActive = LIST_LINK;

function showTime() {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	TIME.textContent = currentTime;
	showDate(date);
	showGreeting(date);
	setTimeout(showTime, 500);
}

function showDate(date) {
	const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
	const currentDate = date.toLocaleDateString(greetingTranslation['date'][language], options);
	DATE.textContent = currentDate;
}

function showGreeting(date) {
	const timeOfDay = getTimeOfDay(date);
	GREETING.textContent = greetingTranslation[timeOfDay][language];
}

function getTimeOfDay(date) {
	const TIME_DAY = ['night', 'morning', 'afternoon', 'evening'];
	return TIME_DAY[Math.trunc(date.getHours() / 6)];
}

/** Load name start */
function setLocalStorage() {
	localStorage.setItem('name', NAME.value);
	localStorage.setItem('city', WEATHER_CITY.value);
	localStorage.setItem('language', SELECT_LANGUAGE.value);
  }
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
	if(localStorage.getItem('name')) {
	  	NAME.value = localStorage.getItem('name');
	}
	if(localStorage.getItem('city')) {
		WEATHER_CITY.value = localStorage.getItem('city');
	}
	if(localStorage.getItem('language')) {
		language = localStorage.getItem('language');
	}
	else {
		language = SELECT_LANGUAGE.value;
	}
	if(localStorage.getItem('bgSource')) {
		bgSource = Number(localStorage.getItem('bgSource'));
	}
	else {
		bgSource = 0;
	}
	if(localStorage.getItem('tags')){
		TAGS_INPUT.value = localStorage.getItem('tags');
		tagsUser = ',' + TAGS_INPUT.value;
	}
	if(localStorage.getItem('linksObj')) {
		links = JSON.parse(localStorage.getItem('linksObj'));
		if(links.length > 0) {
			linkShadowActive = MY_LINK;
			linkShadowActive.classList.toggle('hidden');
			LIST_LINK.classList.toggle('hidden');
			for(let i = 0; i < links.length; i++) {
				for(let key in links[i])
					LINKS_UL.appendChild(createItem(key, links[i][key], i));
			}
		}
	}
	setListSection(); // set list section
	setTagReadOnly(bgSource);
	setBg();
	getQuotes();
}
window.addEventListener('load', getLocalStorage);
/**  Load name end */

/** Background image start */
function getRandomNum() {
	return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}
function getRandomNumPeriod(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getSlideNext() {
 	randomNum = randomNum < 20 ? ++randomNum : 1;
	setBg();
}
function getSlidePrev() {
	randomNum = randomNum > 1 ? --randomNum : 20;
	setBg();
}
SLIDE_NEXT.addEventListener('click', getSlideNext);
SLIDE_PREV.addEventListener('click', getSlidePrev);

async function setBg() {
	const date = new Date();
	const timeOfDay = getTimeOfDay(date);
	const img = new Image();
	switch(Number(bgSource)) {
		case 1:
			const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}${tagsUser}&client_id=S4kJuA0FUf1vVA7SDaLqR1yIG8la7S0UUkAEaqzQ5yY`;
			const res = await fetch(url);
			const data = await res.json();
			img.src = data.urls.regular;
			break;
		case 2:
			const url2 = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d1cda7b1229583078cc2f7041c811665&tags=${timeOfDay}${tagsUser}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`; // &tag_mode=all
			const res2 = await fetch(url2);
			const data2 = await res2.json();
			const validData = data2.photos.photo.filter(value => { if( value.hasOwnProperty('url_h')) return value; });
			img.src = validData[getRandomNumPeriod(0, validData.length)].url_h;
			break;
		default:
			img.src = `https://raw.githubusercontent.com/tuto4ki/stage1-tasks/assets/images/${timeOfDay}/${String(randomNum).padStart(2, '0')}.jpg`;
			break;
	}
	img.onload = () => {
		BODY.style.backgroundImage = `url('${img.src}')`;
	};
}
/** Background image end */

/** Weather start */
async function getWeather() {
	if(WEATHER_CITY.value === '') {
		WEATHER_ICON.className = '';
		TEMPERATURE.textContent = '';
		WEATHER_ERROR.textContent = greetingTranslation['errorWeather'][language];
		WEATHER_DESCRIPTION.textContent = '';
		return;
	}
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY.value}&lang=${language}&appid=84a94a49021f62801d4f1019fc725102&units=metric`;
	const res = await fetch(url);
	const data = await res.json();
	
	if(data.cod !== 200) {
		WEATHER_ICON.className = '';
		TEMPERATURE.textContent = '';
		WEATHER_DESCRIPTION.textContent = '';
		WEATHER_ERROR.textContent = `${greetingTranslation['errorWeatherNotFound'][language]} '${WEATHER_CITY.value}'!`;
		return;
	}
	WEATHER_ICON.className = 'weather-icon owf';
	WEATHER_ICON.classList.add(`owf-${data.weather[0].id}`);
	TEMPERATURE.textContent = `${Math.trunc(data.main.temp)}°C`;
	WEATHER_ERROR.textContent = '';
	WEATHER_DESCRIPTION.innerText = `${data.weather[0].description}\r\n${greetingTranslation['windSpeed'][language]}: ${Math.trunc(data.wind.speed)} ${greetingTranslation['humidityUnit'][language]} \r\n${greetingTranslation['humidity'][language]}: ${Math.trunc(data.main.humidity)} %`;
}
WEATHER_CITY.addEventListener('change', getWeather);
/** Weather end */

/** Quote start */
async function getQuotes() {
	const res = await fetch(URL_JSON);
	dataQuote = await res.json();
	localizationStart();
	//changeQuote();
}
function changeQuote() {
	let ranNum = Math.floor(Math.random() * dataQuote.length);
	QUOTE.textContent = dataQuote[ranNum][language].text;
	AUTHOR.textContent = dataQuote[ranNum][language].author;
}
CHANGE_QUOTE.addEventListener('click', changeQuote);
/** Quote end */

/** Player start */
function setTrack() {
	playNumOld  =playNum;
	AUDIO.src = playList[playNum].src;
	AUDIO.title = playList[playNum].title;
	TITLE_PLAYER.textContent = AUDIO.title;
	AUDIO.currentTime = 0;
}
function playAudio() {
	if(!isPlay) {
		if(playNum != playNumOld)
			setTrack();
		AUDIO.play();
		isPlay = true;
		PLAY.classList.add('pause');
		PLAY_LIST.children[playNum].classList.add('item-active');
	}
	else {
		AUDIO.pause();
		isPlay = false;
		PLAY.classList.remove('pause');
		PLAY_LIST.children[playNum].classList.remove('item-active');
	}
}

function playNext() {
	PLAY_LIST.children[playNum].classList.remove('item-active');
	isPlay = false;
	playNumOld = playNum;
	playNum = playNum >= 3 ? 0 : playNum + 1;
	playAudio();
}

function playPrev() {
	PLAY_LIST.children[playNum].classList.remove('item-active');
	isPlay = false;
	playNumOld = playNum;
	playNum = playNum <= 0 ? 3 : playNum - 1;
	playAudio();
}

function createPlayList () {
	for(let i = 0; i < playList.length; i++) {
		const li = document.createElement('li');
		li.classList.add('play-item');
		
		li.textContent = playList[i].title;
		li.addEventListener('click', (e) => { 
			PLAY_LIST.children[playNum].classList.remove('item-active');
			if(playNum != i)	isPlay = false;	
			playNum = i;
			playAudio(); });
		PLAY_LIST.append(li);
	}
}
function getTimeCodeFromNum(num) {
	let seconds = parseInt(num);
	let minutes = parseInt(seconds / 60);
	seconds -= minutes * 60;
	const hours = parseInt(minutes / 60);
	minutes -= hours * 60;
  	if (hours === 0) {
		  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
	}
	return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function progressActive() {
	PROGRESS_ACTIVE.style.width = AUDIO.currentTime / AUDIO.duration * 100 + "%";
	DURATION_TIMER.textContent = `${getTimeCodeFromNum(AUDIO.currentTime)} / ${getTimeCodeFromNum(AUDIO.duration)}`;
}
function setVolume(newValue) {
	AUDIO.volume = newValue;
}
function muteSong() {
	AUDIO.muted = !AUDIO.muted;
	if(AUDIO.muted) {
		SONG_ICON.style.opacity = 0.4;
		return;
	}
	SONG_ICON.style.opacity = 1;
}

DURATION_PLAYER.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(DURATION_PLAYER).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * AUDIO.duration;
  AUDIO.currentTime = timeToSeek;
}, false);

AUDIO.addEventListener('ended', playNext);
PLAY.addEventListener('click', playAudio);
PLAY_NEXT.addEventListener('click', playNext);
PLAY_PREV.addEventListener('click', playPrev);
INPUT_SONG.addEventListener('input', () => setVolume(INPUT_SONG.value));
SONG_ICON.addEventListener('click', muteSong)
setInterval(progressActive, 500);
setVolume(INPUT_SONG.value);
/** Player stop */

/** Localization start */
function localizationStart() {
	LABEL_LANG.textContent = greetingTranslation['language'][language];
	SELECT_LANGUAGE.value = language;
	LABEL_BG.textContent = greetingTranslation['backgroundImage'][language];
	SELECT_BG.value = bgSource;
	NAME.placeholder = `[${greetingTranslation['placeholderName'][language]}]`;
	WEATHER_CITY.placeholder = `[${greetingTranslation['placeholderCity'][language]}]`;
	TAGS.textContent = greetingTranslation['tags'][language];
	TAGS_INPUT.placeholder = greetingTranslation['tagsPlaceholder'][language];
	TITLE_SHOW.textContent = greetingTranslation['show'][language];
	for(let key in listSection) {
		listSection[key][0].textContent = greetingTranslation[key][language];
	}
	getWeather();
	changeQuote();
	/** City default translate */ 
	if(WEATHER_CITY.value === greetingTranslation['cityDef']['en'] || 
					WEATHER_CITY.value === greetingTranslation['cityDef']['ru']) {
		WEATHER_CITY.value = greetingTranslation['cityDef'][language];
	}
	/** Links */
	LINKS_BTN.textContent = greetingTranslation['links'][language];
	NO_LINKS_TITLE.textContent = greetingTranslation['noLinks'][language];
	ADD_LINK_BTN.textContent = greetingTranslation['addLinks'][language];
	ADD_NEW_LINK_BTN.textContent = greetingTranslation['create'][language];
	NAME_LINK_LBL.textContent = greetingTranslation['nameLink'][language];
	EMAIL_LINK_LBL.textContent = greetingTranslation['emailLink'][language];
	EMAIL_LINK_INPT.textContent = greetingTranslation['linkPlaceholder'][language];
	NEW_LINK_DIV.textContent = greetingTranslation['newLink'][language];
	EDIT_LINK_BTN.textContent  =greetingTranslation['edit'][language];
	const editListLinks = document.querySelectorAll('.li-edit');
	const deleteListLinks = document.querySelectorAll('.li-delete');
	for(let i = 0; i < editListLinks.length; i++) {
		editListLinks[i].textContent = greetingTranslation['edit'][language];
		deleteListLinks[i].textContent = greetingTranslation['delete'][language];
	}
}
function setLanguage() {
	language = SELECT_LANGUAGE.value;
	localStorage.setItem('language', SELECT_LANGUAGE.value);
	localizationStart();
}
function setBgSource() {
	bgSource = SELECT_BG.value;
	localStorage.setItem('bgSource', SELECT_BG.value);
	setTagReadOnly(bgSource);
	setBg();
}
SELECT_LANGUAGE.addEventListener('change', setLanguage);
SELECT_BG.addEventListener('change', setBgSource);

/** Localization end */

/** Tags for search start */
function setTagReadOnly(bgSource) {
	TAGS_INPUT.disabled = !Boolean(Number(bgSource));
}
function tagsAdd() {
	if(TAGS_INPUT.value == '') tagsUser = '';
	else tagsUser = ',' + TAGS_INPUT.value;
	localStorage.setItem('tags', TAGS_INPUT.value);
	setBg();
}
TAGS_INPUT.addEventListener('change', tagsAdd);
/** Tags for search end */

/** List Section start */
document.addEventListener("click", function (e) {
    const target = e.target;
    const its_menu = target == SETTINGS_BTN || SETTINGS.contains(target);
    if (!its_menu ) {
        SETTINGS.classList.add('visibleSectionNone');
		setTimeout(() => {
			SETTINGS.classList.add('hidden');
		}, 500);
    }
	if(target.classList.contains('link-shadow-del') || target.classList.contains('li-delete') || target.classList.contains('li-edit')) {
		return;
	}
	hiddenEditShadow();
	const its_links = target == LINKS_BTN || LINKS_WND.contains(target);
	if(!its_links) {
		LINKS_WND.classList.add('visibleSectionNone');
		setTimeout(() => {
			LINKS_WND.classList.add('hidden');
		}, 500);
	}

  });

function showSettings() {
	if(SETTINGS.classList.contains('visibleSectionNone')) {
		SETTINGS.classList.remove('hidden');
	}
	else {
		setTimeout(() => {
			SETTINGS.classList.add('hidden');
		}, 500);
	}
	SETTINGS.classList.toggle('visibleSectionNone');
}
SETTINGS_BTN.addEventListener('click', showSettings);

function setListSection() {
	for(let key in listSection) {
		listSection[key][2].classList.add('visibleSection');
		if(localStorage.getItem(key)) {
			const isDisplay = localStorage.getItem(key) == 'true'
			listSection[key][1].checked = isDisplay;
			if(!isDisplay) {
				listSection[key][2].classList.add('visibleSectionNone');
				listSection[key][2].classList.add('hidden');
			}
		}
		else {
			listSection[key][1].checked = true;
		}
	}
}
for(let key in listSection) {
	listSection[key][1].addEventListener('change', (e) => {
		localStorage.setItem(key, e.srcElement.checked);
		listSection[key][2].classList.toggle('visibleSectionNone');
		if(listSection[key][2].classList.contains('visibleSectionNone')) {
			setTimeout(() => {
				listSection[key][2].classList.add('hidden'); 
			}, 500);
		}
		else {
			listSection[key][2].classList.remove('hidden');
		}
	});
}
/** List Section end */

/** Links start */
function showLinks() {
	
	LINKS_WND.classList.toggle('visibleSectionNone');
	if(LINKS_WND.classList.contains('visibleSectionNone')) {
		setTimeout(() => {
			LINKS_WND.classList.add('hidden');
			LINKS_WND.classList.add('visibleSectionNone');
		}, 500);
	}
	else {
		LINKS_WND.classList.remove('hidden');
	}
}
LINKS_BTN.addEventListener('click', showLinks);

function addNewLink(e) {
	ADD_NEW_LINK_BTN.classList.remove('hidden');
	EDIT_LINK_BTN.classList.add('hidden');
	NAME_LINK_INPT.value = EMAIL_LINK_INPT.value = '';
	linkShadowActive.classList.toggle('hidden');
	ADD_LINK.classList.toggle('hidden');
}

function isValidLink() {
	if(NAME_LINK_INPT.value === '') {
		NAME_LINK_INPT.classList.add('error-link');
		setTimeout(() => {
			NAME_LINK_INPT.classList.remove('error-link');
		}, 500);
		return false;
	}
	if(EMAIL_LINK_INPT.value === '') {
		EMAIL_LINK_INPT.classList.add('error-link');
		setTimeout(() => {
			EMAIL_LINK_INPT.classList.remove('error-link');
		}, 500);
		return false;
	}
	return true;
}

function saveNewLink() {
	if(!isValidLink()) {
		return;
	}
	const key = NAME_LINK_INPT.value;
	const value = EMAIL_LINK_INPT.value;
	LINKS_UL.appendChild(createItem(key, value, links.length));
	linkShadowActive = MY_LINK;
	links.push({[key]: value});
	localStorage.setItem('linksObj', JSON.stringify(links));
	MY_LINK.classList.toggle('hidden');
	ADD_LINK.classList.toggle('hidden');
}
/** Delete link */
function deleteLink(index) {
	const list = document.querySelector(`li.link-li[index='${index}']`);
	const li = list.childNodes[0];
	list.remove(li);
	links.splice(index, 1);
	for(let i = index; i < LINKS_UL.children.length; i++) {
		LINKS_UL.children[i].setAttribute('index', i);
	}
	localStorage.setItem('linksObj', JSON.stringify(links));
	if(links.length == 0) {
		linkShadowActive.classList.toggle('hidden');
		linkShadowActive = LIST_LINK;
		linkShadowActive.classList.toggle('hidden');
	}
}

/** Edit link */
function editLink(e, index) {
	addNewLink(e);
	ADD_NEW_LINK_BTN.classList.add('hidden');
	EDIT_LINK_BTN.classList.remove('hidden');
	EDIT_LINK_BTN.setAttribute('index', index);
	for(let key in links[index]) {
		NAME_LINK_INPT.value = key;
		EMAIL_LINK_INPT.value = links[index][key];
	}
	
}
function changeLink() {
	if(!isValidLink()) {
		return;
	}
	const key = NAME_LINK_INPT.value;
	const value = EMAIL_LINK_INPT.value;
	const index = Number(EDIT_LINK_BTN.getAttribute('index'));
	links[index] = {[key] : value};
	localStorage.setItem('linksObj', JSON.stringify(links));
	const linkNew = createItem(key, value, index);
	LINKS_UL.replaceChild(linkNew, LINKS_UL.children[index]);
	linkShadowActive = MY_LINK;
	MY_LINK.classList.toggle('hidden');
	ADD_LINK.classList.toggle('hidden');
}
/** Add li */
function hiddenEditShadow() {
	document.querySelectorAll('.shadow-edit').forEach((value) => { if(!value.classList.contains('hidden')) {value.classList.add('hidden');} });
}
function createItem(key, value, index) {
	const divItem = document.createElement('div');
	divItem.classList.add('link-div-item');
	const li = document.createElement('li');
	li.classList.add('link-li');
	const link = document.createElement('a');
	link.href = value;
	link.title = key;
	link.classList.add('link-item')
	const img = document.createElement('img');
	img.src = './assets/img/link-open.png';
	img.classList.add('link-img-open');
	link.appendChild(img);
	li.setAttribute('index', index);
	const span = document.createElement('span');
	span.textContent = key;
	span.classList.add('link-name')
	link.appendChild(span);
	// add delete, change link
	const groupEdit = document.createElement('div');
	groupEdit.classList.add('relative');
	const div = document.createElement('div');
	div.classList.add('link-shadow-del');
	
	link.addEventListener('mouseover', () => {div.classList.add('link-shadow-del-active');});
	link.addEventListener('mouseout', () => {div.classList.remove('link-shadow-del-active');});
	// add shadow remove, edit
	const divEdit = document.createElement('div');
	divEdit.classList.add('shadow-edit');
	divEdit.classList.add('hidden');
	const ulEdit = document.createElement('ul');
	const liEdit = document.createElement('li');
	liEdit.textContent = greetingTranslation['edit'][language];// 'Edit';
	ulEdit.appendChild(liEdit);
	const liDelete = document.createElement('li');
	liEdit.classList.add('li-edit');
	liEdit.addEventListener('click', (e) => { 
		hiddenEditShadow();
		editLink(e, li.getAttribute('index')); });
	liDelete.textContent = greetingTranslation['delete'][language];//'Delete';
	liDelete.classList.add('li-delete');
	liDelete.addEventListener('click', () => { 
		hiddenEditShadow();
		deleteLink(li.getAttribute('index')); });
	ulEdit.appendChild(liDelete);
	divEdit.appendChild(ulEdit);
	groupEdit.appendChild(divEdit);
	//groupEdit
	div.addEventListener('click', () => {
		if(divEdit.classList.contains('hidden')) {
			hiddenEditShadow();
		}
		divEdit.classList.toggle('hidden');
	});
	// add link
	divItem.appendChild(link);
	groupEdit.appendChild(div);
	divItem.appendChild(groupEdit);
	li.appendChild(divItem);
	return li;
}
ADD_LINK_BTN.addEventListener('click', (e) => addNewLink(e));
NEW_LINK_DIV.addEventListener('click', (e) => addNewLink(e));
PREV_LINK.addEventListener('click', (e) => addNewLink(e));
ADD_NEW_LINK_BTN.addEventListener('click', saveNewLink);
EDIT_LINK_BTN.addEventListener('click', changeLink);
/** Links end */
setTrack();
createPlayList();
showTime();