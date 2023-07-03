import React, { useEffect, useState } from 'react'
import CardFeatures from './CardFeatures'
import { useSelector } from 'react-redux'
import FilterProduct from './FilterProduct'

const Allproduct = ({heading}) => {
    const productData = useSelector((state) => state.product.productList)
    const categoryList = [...new Set(productData.map(el => el.category))]

    //filter data display
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const handleFilterProduct = (category) => {
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }

    const loadingArrayFeature = new Array(10).fill(null)

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl text-slate-800 mb-4 '>{heading}</h2>

            <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
                {
                    categoryList[0] ? categoryList.map(el => {
                        return (
                            <FilterProduct key={el} category={(el)} onClick={() => handleFilterProduct(el)} />
                        )
                    })
                        :
                        <div className='min-h-[150px] flex justify-center items-center'>
                            <p>Loading...</p>
                        </div>
                }
            </div>

            <div className='flex flex-wrap justify-center gap-4 my-4'>
                {
                    dataFilter[0]?dataFilter.map(el => {
                        return (
                            <CardFeatures
                                key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                            />
                        )
                    })
                    :

                    loadingArrayFeature.map((el,index) => <CardFeatures key={index+"allproduct"} loading="Loading..." />)
                }
            </div>

        </div>
    )
}

export default Allproduct
