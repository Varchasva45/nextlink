import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layouts/SectionBox"
import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";
import Event from "@/models/Event";
import Chart from "@/components/Chart";
import { addDays, differenceInDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default async function AnalyticsPage() {

    const session = await getServerSession(authOptions);
    const today = new Date().toISOString().split('T')[0];

    if(!session) {
        return (
            <div>
                {"No Usser Found"}
            </div>
        );
    }

    const page = await Page.findOne({owner: session.user.email});

    if(!page) {
        return (
            <div>
                {"Not Available"}
            </div>
        
        );
    }
    
    const groupedViews = await Event.aggregate([
        {
            $match: {
                type: 'View',
                page: page.uri,
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                    date: "$createdAt",
                    format: "%Y-%m-%d"
                    },
                },
                count: {
                    "$count": {},
                }
            },
        },
        {
            $sort: {_id: 1}
        }
    ]);

    const data = groupedViews.map((item) => {
        return {
            date: item._id,
            views: item.count
        }
    });

    const dateWithGaps = [];

    data.forEach((value, index) => {

        const currDate = value.date;
        dateWithGaps.push({
            date: currDate,
            views: value.views
        });
        const nextDate = data[index + 1]?.date;

        if(currDate && nextDate) {

            const daysBetween = differenceInDays(
                new Date(nextDate),
                new Date(currDate)
            );

            if(daysBetween > 1) {
                for(let i = 1; i < daysBetween; i++) {
                    const dateBetween = addDays(new Date(currDate), i);
                    dateWithGaps.push({
                        date: dateBetween.toISOString().split('T')[0],
                        views: 0
                    });
                }
            }

        }
    });

    const clicks = await Event.find({
        type: 'Click',
        page: page.uri
    });

    return (
        <div> 
            <SectionBox>
                <h2 className="text-xl mb-6 text-center font-semibold">Views</h2>
                <Chart data={dateWithGaps}/>
                
            </SectionBox>

            <SectionBox>
                <h2 className="text-xl mb-6 text-center font-semibold">Clicks</h2>
                
                {   
                    page.links.map((link) => (
                        <div key={link._id} className="flex md:flex-row flex-col gap-6 items-center justify-center border-t border-gray-300 py-4">    
                            <div className="flex gap-6 grow items-center">
                                <div> 
                                    <FontAwesomeIcon icon={faLink} height={24} width={24} className="text-blue-500 pl-6"/>
                                </div>
                                <div className="grow">
                                    <h3>{link.title || "no title"}</h3>
                                    <p className="text-gray-400">{link.subtitle || "no subtitle"}</p>
                                    <a target="_blank" href={link.url} className="text-sm text-blue-500">{link.url}</a>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="text-center">
                                    <div className="border border-gray-300 rounder-md p-2">    
                                        <div className="text-2xl"> 
                                            {
                                                clicks.filter((click) => {
                                                    const clickDate = click.createdAt.toISOString().split('T')[0];
                                                    return clickDate === today && click.uri === link.url;
                                                }).length
                                            }
                                        </div>
                                            
                                        <div className="uppercase text-gray-400 text-xs">Clicks Today</div>
                                    </div>
                                </div>

                                <div className="text-center mr-6">
                                    <div className="border border-gray-300 rounder-md p-2">
                                        <div className="text-2xl"> 
                                            {
                                                clicks.filter((click) => {
                                                    return click.uri === link.url;
                                                }).length
                                            }
                                        </div>
                                            
                                        <div className="uppercase text-gray-400 text-xs">Cicks Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </SectionBox>
        </div>
        
    )
}

