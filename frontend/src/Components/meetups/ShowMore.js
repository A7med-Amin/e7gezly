function ShowMore(props) {
    return (
        <div className="ShowMore" style={{padding: '40px 50px'}}>
            <p style = {{fontWeight : 'bold' , lineHeight: '35px'}}>{props.text}</p>
        </div>
    );
}

export default ShowMore;