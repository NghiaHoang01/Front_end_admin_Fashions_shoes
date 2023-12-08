import { Button, Flex, Image, Modal } from "antd"

const ModalImageOfProduct = (props) => {

    const { isModalImageOfProductOpen, setIsModalImageOfProductOpen, mainImage, setMainImage, secondaryImages, setSecondaryImages } = props

    const handleCancelModalImageOfProductOpen = () => {
        setIsModalImageOfProductOpen(false);
        setMainImage([])
        setSecondaryImages([])

    };

    return <Modal
        title='Images of Product'
        width={730}
        open={isModalImageOfProductOpen}
        onCancel={handleCancelModalImageOfProductOpen}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalImageOfProductOpen}>Cancel</Button>
            </>
        }>
        <Flex justify='space-between' >
            <div className="w-[32%]">
                <p className="text-[18px] mb-2 text-eclipse font-semibold tracking-[0.75px]">Main image</p>
                <Image
                    width='100%'
                    height={220}
                    style={{
                        overflow: 'hidden',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        border: '1px solid #dddddd',
                        borderRadius: '8px'
                    }}
                    src={mainImage}
                />
            </div>
            <div className="w-[67%] h-full">
                <p className="text-[18px] mb-2 text-eclipse font-semibold tracking-[0.75px] ml-[14px]">Secondary image</p>
                <Flex wrap="wrap" style={{ height: '220px' }}>
                    {
                        secondaryImages?.map((item, index) => <div key={index} className="ml-[14px] mb-[14px]">
                            <Image
                                width={100}
                                height={100}
                                style={{
                                    overflow: 'hidden',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    border: '1px solid #dddddd',
                                    borderRadius: '8px'
                                }}
                                src={item}
                            />
                        </div>)
                    }
                </Flex>
            </div>
        </Flex>
    </Modal>
}

export default ModalImageOfProduct