export default function ExampleComponent({title, weather}){
    // {title, weather in the properties does this}
    // {title, weather} would be replaced with props
    // and then
    // const title = props.title
    // const weather = props.weather
    return <div>{title} {weather}</div>
}