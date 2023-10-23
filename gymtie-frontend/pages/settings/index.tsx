import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { getMemberDetails } from "../../services/memberApi";
import { listPaymentsOfMember } from "../../services/paymentApi";
import moment from "moment";
import { useRouter } from "next/router";
import { IMemberDetails } from "../../model";
import Loader from "../../components/loader";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();

  const [member, setMember] = useState<IMemberDetails>();
  const [memberPayments, setMemberPayments] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [monthsFromJoingDate, setMonthsFromJoiningDate] = useState<any>([]);

  useEffect(() => {
    if (router?.query?.id) {
      const handleListMembers = async () => {
        setLoading(true);
        const memberResponse: any = await getMemberDetails(router?.query?.id);
        const paymentResponse: any = await listPaymentsOfMember(
          router?.query?.id
        );
        if (memberResponse?.status === 200 && paymentResponse?.status === 200) {
          setMember(memberResponse?.data?.data);
          setMemberPayments(paymentResponse?.data?.reverse());
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      handleListMembers();
    }
  }, [router?.query?.id]);

  useEffect(() => {
    if (member?.joiningDate) {
      const monthsFromJoingDateVar = [];
      const startDate = moment(member?.joiningDate, "YYYY-MM-DD");
      const currentDate = moment();
      let currentDateIter = startDate.clone();

      while (
        currentDateIter.isBefore(currentDate) ||
        currentDateIter.isSame(currentDate, "month")
      ) {
        monthsFromJoingDateVar?.push(currentDateIter.format("MMM YYYY"));
        currentDateIter.add(1, "months");
      }
      setMonthsFromJoiningDate(monthsFromJoingDateVar?.reverse());
    }
  }, [member]);

  const filterPaymentsByMonth = (targetMonth) => {
    return memberPayments.filter((payment) => {
      const paymentMonthYear = moment(payment?.paymentDate).format("MMM YYYY");
      return paymentMonthYear === targetMonth;
    });
  };

  return (
    <>
      <div id="wrapper">
        {/* <Sidebar /> */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            {loading && <Loader />}
            {!loading && (
              <div className="container">
                <div className="container-fluid">
                  <div className="settings">
                    <div className="row">
                      <div className="col-4">
                        <Link href="/settings/members">
                          <button className="button-67" role="button">
                            Members
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
