interface card {
  nameOfClub: string;
  logoUrl: string;
}

function TeamDisplayCard(props: card) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <img src={"http://localhost:4000" + props.logoUrl} alt="Herb" />

        <h2>{props.nameOfClub}</h2>
      </div>
    </>
  );
}

export default TeamDisplayCard;
