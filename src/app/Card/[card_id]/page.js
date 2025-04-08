export default function CardPage({ params }) {
    const card_id = params.card_id;
    console.log(params)
    return (
        <div>
            <h1>Card {card_id}</h1>
        </div>
    );
}
