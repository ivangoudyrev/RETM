export default function Calendar(){
  return(
    <div className="container border mb-2 p-2">
      <iframe 
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&showTitle=0&showNav=1&showDate=0&showPrint=0&showTabs=0&showCalendars=0&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB" 
        style={{border: 'solid 1px #777'}}
        width="100%" 
        height="350"
        bgcolor="%239E69AF" 
        frameBorder="0" 
        scrolling="no"
      >
      </iframe>
    </div>
  )
}