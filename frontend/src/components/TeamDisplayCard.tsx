interface card {
  id: string;
  nameOfClub: string;
  logoUrl: string;
  onRemove: () => void;
}

function TeamDisplayCard(props: card) {
  return (
    <>
      <div className="col-md-11 position-relative d-flex shadow justify-content-between border border-3 align-items-center bg-light border-dark mt-5 mb-5 p-5 rounded-5 border-opacity-75 m-auto ">
        <h1>{props.nameOfClub}</h1>
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Close"
          onClick={props.onRemove}
        ></button>
        <img
          src={"http://localhost:4000" + props.logoUrl}
          alt="Herb"
          width={200}
        />
      </div>
    </>
  );
}

export default TeamDisplayCard;
