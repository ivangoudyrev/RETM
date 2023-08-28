export default function (props) {
  const { address } = props;
  const apiKey = 'AIzaSyAn4v_3JvUjuyXfFktZU3HImPAV5prllpE';
  // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=13&size=600x600&maptype=roadmap&key=${apiKey}`;
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=12&size=600x600&maptype=roadmap&markers=color:red|${encodeURIComponent(address)}&key=${apiKey}`;

  return (
    <div className="map">
      <img src={mapUrl} alt="Google Map" className="img-fluid" />
    </div>
  )
}