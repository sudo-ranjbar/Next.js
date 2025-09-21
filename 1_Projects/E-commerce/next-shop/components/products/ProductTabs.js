"use client"
import Link from "next/link"
import ProductBox from "./ProductBox"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function ProductTabs({ tabList, tabPanel }) {

    return (
        <section className="food_section layout_padding-bottom">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        منو محصولات
                    </h2>
                </div>

                <Tabs selectedTabClassName="active">
                    <TabList>
                        <ul className="filters_menu">
                            {tabList.map((item, index) => (
                                <Tab key={index}>{item}</Tab>
                            ))}
                        </ul>
                    </TabList>

                    <div className="filters-content">
                        {tabPanel.map((panel, index) => (
                            <TabPanel key={index}>
                                <div className="row grid">
                                    {panel.map((product) => (
                                        <div key={product.id} className="col-sm-6 col-lg-4">
                                            <ProductBox product={product} />
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        ))}
                    </div>
                </Tabs>

                <div className="btn-box">
                    <Link href="/menu">
                        مشاهده بیشتر
                    </Link>
                </div>

            </div>
        </section>
    )
}