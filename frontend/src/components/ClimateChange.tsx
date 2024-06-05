/*
function ClimateChange() {
    const [data, setData] = useState<ClimateData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        update();
    }, []);

    function update() {
        fetch(`${process.env.REACT_APP_BACKEND}api/climate-changes?populate=*`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const { title, image } = data;
    const imageUrl = image?.data?.attributes?.url;

    if (!imageUrl) {
        return <div>Error: Image URL not found</div>;
    }

    return (
        <div
            className="climate-change-container"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="overlay-text">
                {title}
            </div>
        </div>
    );
}


export default ClimateChange;*/
