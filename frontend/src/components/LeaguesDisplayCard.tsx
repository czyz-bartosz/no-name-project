interface props {
  key: string;
  leagueName: string;
  onButtonClick: () => void;
  onDivClick: () => void;
  onRemove: () => void;
}

function LeaguesDisplayCard(props: props) {
  return (
    <>
      <div
        onClick={props.onDivClick}
        className="col-md-11 position-relative d-flex shadow justify-content-between border border-3 align-items-center bg-light border-dark mt-5 mb-5 p-5 rounded-5 border-opacity-75 m-auto "
      >
        <h1>{props.leagueName}</h1>

        <button
          onClick={(event) => {
            event.stopPropagation();
            props.onButtonClick();
          }}
          type="button"
          className="btn btn-success me-5"
        >
          Dodaj zespoły
        </button>
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Close"
          onClick={(event1) => {
            event1.stopPropagation();
            props.onRemove();
          }}
        ></button>
      </div>
    </>
  );
}

export default LeaguesDisplayCard;
