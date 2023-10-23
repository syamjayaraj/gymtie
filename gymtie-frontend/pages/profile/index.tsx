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
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                    <div className="my-4">
                      <form>
                        <div className="row mt-5 align-items-center">
                          <div className="col-md-3 text-center mb-5">
                            <div className="avatar avatar-xl">
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                alt="..."
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="row align-items-center">
                              <div className="col-md-7">
                                <h4 className="mb-1">Brown, Asher</h4>
                                <p className="small mb-3">
                                  <span className="badge badge-dark">
                                    New York, USA
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-md-7">
                                <p className="text-muted">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Mauris blandit nisl
                                  ullamcorper, rutrum metus in, congue lectus.
                                  In hac habitasse platea dictumst. Cras urna
                                  quam, malesuada vitae risus at, pretium
                                  blandit sapien.
                                </p>
                              </div>
                              <div className="col">
                                <p className="small mb-0 text-muted">
                                  Nec Urna Suscipit Ltd
                                </p>
                                <p className="small mb-0 text-muted">
                                  P.O. Box 464, 5975 Eget Avenue
                                </p>
                                <p className="small mb-0 text-muted">
                                  (537) 315-1481
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label>Firstname</label>
                            <input
                              type="text"
                              id="firstname"
                              className="form-control"
                              placeholder="Brown"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Lastname</label>
                            <input
                              type="text"
                              id="lastname"
                              className="form-control"
                              placeholder="Asher"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="brown@asher.me"
                          />
                        </div>
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputAddress5"
                            placeholder="P.O. Box 464, 5975 Eget Avenue"
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label>Company</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputCompany5"
                              placeholder="Nec Urna Suscipit Ltd"
                            />
                          </div>

                          <div className="form-group col-md-2">
                            <label>Zip</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputZip5"
                              placeholder="98232"
                            />
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Old Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputPassword5"
                              />
                            </div>
                            <div className="form-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputPassword5"
                              />
                            </div>
                            <div className="form-group">
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="inputPassword6"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-2">Password requirements</p>
                            <p className="small text-muted mb-2">
                              To create a new password, you have to meet all of
                              the following requirements:
                            </p>
                            <ul className="small text-muted pl-4 mb-0">
                              <li>Minimum 8 character</li>
                              <li>At least one special character</li>
                              <li>At least one number</li>
                              <li>Can’t be the same as a previous password</li>
                            </ul>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Save Change
                        </button>
                      </form>
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
