import styles from './TestPage.module.css';

export const TestPage = () => {
    const items = [
        {
            title: "Titlu",
            avatar: "Avatar"
        },
        {
            title: "Titlu",
            avatar: "Avatar"
        },
        {
            title: "Titlu",
            avatar: "Avatar"
        },
        {
            title: "Titlu",
            avatar: "Avatar"
        }
    ]
    
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex h-[50vh] w-[800px]">
                <div className="flex flex-col p-2 w-48 border-black border-2 grid-rows-1 bg-[#0f0f0f]">
                    {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <p className="text-white">{item.title}</p>
                            <p className="text-white">{item.avatar}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full h-full">
                    <img className="h-full object-cover" src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg" alt="" />
                </div>
            </div>
        </div>
    );
}