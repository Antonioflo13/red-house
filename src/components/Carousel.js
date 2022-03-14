
import React from 'react';
import { Carousel } from 'primereact/carousel';
import './CarouselDemo.css';

const CarouselDemo = () => {
    const products = [
        {   
            id: 1, 
            image: 'https://www.vacanzeostuni.com/wp-content/uploads/vacanze-ostuni-casa-lorenzo-terrazza.jpg',
            name: '1'
        },
        {   
            id: 2, 
            image: 'https://www.vacanzeostuni.com/wp-content/uploads/vacanze-ostuni-casa-ilari-balcone-vista-mare.jpg',
            name: '2'
        }
    ]
    
    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img id={product.id} src={`${product.image}`}  alt={product.name} className="product-image" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-demo">
            <div className="card">
                <Carousel 
                value={products} 
                numVisible={1}
                numScroll={2}
                itemTemplate={productTemplate}
                autoplayInterval={10}
                circular={true}
            />
            </div>
        </div>
    );
}

export default CarouselDemo;