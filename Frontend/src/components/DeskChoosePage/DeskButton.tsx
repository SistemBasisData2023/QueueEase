interface DeskButtonProps {
    deskNo: string;
    isOccupied: boolean;
    handleCheckIn: (deskNo: string) => void;
  }
  
  function DeskButton({ deskNo, isOccupied, handleCheckIn }: DeskButtonProps) {
    const handleClick = () => {
      if (!isOccupied) {
        handleCheckIn(deskNo);
      }
    };
  
    return (
      <button
        className={`btn btn-primary ${isOccupied ? 'btn-disabled' : ''}`}
        disabled={isOccupied}
        onClick={handleClick}
      >
        {deskNo}
      </button>
    );
  }
  
  export default DeskButton;
  