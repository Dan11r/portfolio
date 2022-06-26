import './styles/index.scss'
import { translation } from './translation'

//перевод страницы
//-------------------------------------------------------

const checkbox = document.querySelector('.switch__input')
const allLangs = ['eng', 'ru']

checkbox.addEventListener('change', changeUrlLanguage)

function changeUrlLanguage() {
  let lang = checkbox.checked ? 'ru' : 'eng'
  location.href = `${window.location.pathname}#${lang}`
  changeLanguage()
}

function changeLanguage() {
  const titleStr = 'title'
  const title = document.querySelector(titleStr)
  let hash = window.location.hash
  hash = hash.substr(1)

  if (!allLangs.includes(hash)) {
    location.href = window.location.pathname + '#eng'
    location.reload()
  }
  checkbox.checked = hash !== 'eng'

  for (let key in translation) {
    const currentHtmlElement = document.querySelector(`.lang-${key}`)
    if (key === titleStr) {
      title.innerHTML = translation[titleStr][hash]
    } else {
      currentHtmlElement.innerHTML = translation[key][hash]
    }
  }
}
changeLanguage()

//-------------------------------------------------------

//прокрутка к секции
//-------------------------------------------------------
const navLinks = document.querySelectorAll('.header__link>a[data-goto]')
const sections = document.querySelectorAll('h2')

if (navLinks.length !== 0) {
  navLinks.forEach((navlink) => {
    navlink.addEventListener('click', goToSection)
  })
}

function goToSection(e) {
  let link = e.target
  const section = document.querySelector(link.dataset.goto)

  e.preventDefault()
  closeMenu()
  if (link.dataset.goto && section) {
    let sectionLocation =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      document.querySelector('header').offsetHeight

    window.scrollTo({
      top: sectionLocation,
      behavior: 'smooth',
    })
  }
}
//-------------------------------------------------------

//подсвечивать в nav секцию находящуюся на экране
//-------------------------------------------------------
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeLink = document.querySelector(
          `a[data-goto=".${entry.target.classList[0].split('__')[0]}"]`,
        )
        toColorActiveLink(navLinks, activeLink)
      }
    })
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  },
)

sections.forEach((s) => {
  observer.observe(s)
})

//-------------------------------------------------------

//логика кнопки меню
//-------------------------------------------------------

const menu = document.querySelector('.menu-icon')
const navMenu = document.querySelector('.nav')
const switchLang = document.querySelector('.switch')

if (menu) {
  menu.addEventListener('click', () => {
    document.body.classList.toggle('--scrolling-lock')
    menu.classList.toggle('menu-icon--active')
    navMenu.classList.toggle('nav--active')
    switchLang.classList.toggle('switch--nav-active')
  })
}

//-------------------------------------------------------

function closeMenu() {
  if (menu.classList.contains('menu-icon--active')) {
    document.body.classList.toggle('--scrolling-lock')
    menu.classList.toggle('menu-icon--active')
    navMenu.classList.toggle('nav--active')
    switchLang.classList.toggle('switch--nav-active')
  }
}

function toColorActiveLink(arrLinks, activeLink) {
  arrLinks.forEach((l) => l.classList.remove('--active'))
  activeLink.classList.add('--active')
}
