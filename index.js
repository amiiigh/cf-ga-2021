const Router = require('./router')
const STATIC_PAGE_URL = "https://static-links-page.signalnerve.workers.dev"
const PROFILE_IMAGE_URL = "https://people.cs.umass.edu/~ghafari/assets/images/ah3.jpg"
const USER_NAME = "Amir Ghafari"

addEventListener('fetch', event => {
    event.respondWith(handleEvent(event))
})

function getLinksArray() {
  const links = [
    { "name": "A sample URL", "url": "https://asampleurl.com" }, 
    { "name": "Another sample URL", "url": "https://anothersampleurl.com" }, 
    { "name": "A final sample URL", "url": "https://afinalsampleurl.com" }
  ]
  return links
}

function getSocialLinksArray() {
  const links = [
    {"svg": "https://simpleicons.org/icons/instagram.svg" , "url": "https://www.instagram.com/amiiigh"},
    {"svg": "https://simpleicons.org/icons/linkedin.svg", "url": "https://www.linkedin.com/in/amiiigh/"},
    {"svg": "https://simpleicons.org/icons/github.svg", "url": "https://github.com/amiiigh"},
    {"svg": "https://simpleicons.org/icons/twitter.svg", "url": "https://twitter.com/amiiigh"}
  ]
  return links
}

function JSONHandler(request) {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify(getLinksArray())
  return new Response(body, init)
}

async function handleEvent(event) {
  const r = new Router()
  r.get('.*/links', () => JSONHandler(event))
  r.get('.*/*', () => handleStaticWebpageEvent(event))
  const resp = await r.route(event.request)
  return resp
}

class SocialLinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    for (let link of this.links) {
      let svg
      await fetch(link.svg).then( r=> r.text()).then((r) => {
        element.append('<a href="'+ link.url + '">' + r.slice(0, 4) + ' style="width: inherit; height:inherit; "' + r.slice(4) + '</a>',  { html: true })
      })
      
    }
  }
}

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  element(element) {
    for (let link of this.links) {
      element.append('<a href="'+ link.url + '">' + link.name + '</a>',  { html: true })
    }
  }
}

// for writing text inside an element
class TextRewriter {
  constructor(newText) {
    this.newText = newText
  }
  element(element) {
    console.log(this.newText)
    element.setInnerContent(this.newText)
  }
}

class AttributeRewriter {
  constructor(attributeName, newValue) {
    this.attributeName = attributeName
    this.newValue = newValue
  }
  element(element) {
    element.setAttribute(this.attributeName, this.newValue)
  }
}

const rewriter = new HTMLRewriter()
  .on("div[id='links']", new LinksTransformer(getLinksArray()))
  .on("div[id='profile']", new AttributeRewriter('style', 'display: block'))
  .on("div[id='social']", new AttributeRewriter('style', 'display: flex'))
  .on("div[id='social']", new SocialLinksTransformer(getSocialLinksArray()))
  .on("title", new TextRewriter(USER_NAME))
  .on("svg", new AttributeRewriter('style', 'width: inherit; height: inherit'))
  .on("body", new AttributeRewriter('class', 'bg-green-900'))
  .on("img[id='avatar']", new AttributeRewriter('src', PROFILE_IMAGE_URL))
  .on("h1[id='name']", new TextRewriter(USER_NAME))

async function handleStaticWebpageEvent(event) {
  let response = await fetch(STATIC_PAGE_URL)
  return rewriter.transform(response)
}