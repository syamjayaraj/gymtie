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

export default function Profile() {
  const router = useRouter();

  const [member, setMember] = useState<IMemberDetails>();
  const [memberPayments, setMemberPayments] = useState<any>();
  const [loading, setLoading] = useState(false);

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
          setMemberPayments(paymentResponse?.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      handleListMembers();
    }
  }, [router?.query?.id]);

  console.log(member, "lroem");

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            {loading && <Loader />}
            {!loading && (
              <div className="container-fluid">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h1 className="h3 mb-2 text-gray-800">Profile</h1>
                </div>
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <div className="modal-body">
                      <center>
                        <img
                          src="/assets/images/user.png"
                          width="140"
                          height="140"
                          className="rounded-circle"
                        />
                        <h3 className="media-heading">
                          {member?.name}
                          <span className="text-muted">
                            ({member?.memberId})
                          </span>
                        </h3>
                      </center>
                      <hr />

                      <div className="container">
                        <div className="page-header">
                          <h4 id="timeline">Fee payment history</h4>
                        </div>
                        <ul className="timeline">
                          {memberPayments?.map((paymentItem, index) => {
                            return (
                              <li
                                className="timeline-inverted"
                                key={"payment-item" + index}
                              >
                                <div className="timeline-badge default">
                                  <i className="glyphicon glyphicon-credit-card"></i>
                                </div>
                                <div className="timeline-panel">
                                  <div className="timeline-heading">
                                    <h4 className="timeline-title">
                                      ₹ {paymentItem?.amount}
                                    </h4>
                                    <span className="badge badge-pill badge-light">
                                      {moment(paymentItem?.paymentDate).format(
                                        "Do MMM yyyy"
                                      )}
                                    </span>
                                  </div>
                                  <div className="timeline-body mt-2">
                                    <p>
                                      <span className="text-muted">Note: </span>
                                      {paymentItem?.note}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
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
