import './layout.scss'

const MainLayout = ({
                         children,
                     }: {
    children: React.ReactNode
}) => {
    return (
        <section className={'layout'}>
            <div className={'layout__space'}>
                {children}
            </div>
        </section>
    )
}

export default MainLayout