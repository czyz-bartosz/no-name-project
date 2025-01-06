interface card {
  nameOfClub: string;
  logoUrl: string;
}

function TeamDisplayCard(props: card) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <img src={props.logoUrl} alt="Herb" />
        <h2>{props.nameOfClub}</h2>
      </div>
    </>
  );
}

export default TeamDisplayCard;
