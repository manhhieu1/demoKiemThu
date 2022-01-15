import {
  Button,
  Carousel,
  Image,
  Form,
  Input,
  Select,
  Spin,
  Empty,
  Typography,
  Checkbox,
} from "antd";
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
// import Header from "../../components/Header";
import { DoubleRightOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import { HiOutlineMinusSm, HiPlusSm } from "react-icons/hi";
const Home = () => {
  const [dsCars, setDsCars] = useState([]);
  const [carDetail, setCarDetail] = useState([]);
  const [idCar, setIdCar] = useState();
  const [visible, setVisible] = useState(false);
  const [dsCarVendors, setDsCarsVendors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchVender, setSearchVender] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchSeat, setSearchSeat] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [vendorPrice, setVendorPrice] = useState(0);
  const [kmPrice, setKmPrice] = useState(650000);
  const [typePrice, setTypePrice] = useState(0);
  const [drivePrice, setdrivePrice] = useState(0);
  const [days, setDays] = useState(1);
  const [checked, setChecked] = useState(false);

  const [form] = Form.useForm();
  const initialValue = {
    name: null,
    seat: null,
    vendor: null,
    year: null,
  };

  const onRefresh = () => {
    setSearchSeat("");
    setSearchVender("");
    setSearchYear("");
    setSearchName("");
    form.setFieldsValue(initialValue);
    getDsCars();
  };
  const getDsCars = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `https://cars-rental-api.herokuapp.com/cars`,
        {
          params: {
            search: searchName ? searchName : null,
            year: searchYear ? searchYear : null,
            typeId: searchSeat ? searchSeat : null,
            vendorsId: searchVender ? searchVender : null,
          },
        }
      );
      setDsCars(resp?.data?.data?.cars);
    } catch (error) {
      console.log(error);
    }
    setSearch(false);
    setLoading(false);
  };
  const getCarDetail = async () => {
    if (idCar) {
      try {
        const resp = await axios.get(
          `https://cars-rental-api.herokuapp.com/cars/${idCar}`,
          {}
        );
        setCarDetail([resp?.data?.data?.car]);
        const seat1 = resp?.data?.data?.car?.seat;
        const vendor1 = resp?.data?.data?.car?.seat;
        // eslint-disable-next-line  eqeqeq
        setTypePrice(seat1 == "4" ? 100000 : seat1 == "7" ? 200000 : 350000);
        setVendorPrice(
          // eslint-disable-next-line  eqeqeq
          vendor1 == "1" ? 100000 : vendor1 == "2" ? 200000 : 150000
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getDsCarsVendors = async () => {
    try {
      const resp = await axios.get(
        `https://cars-rental-api.herokuapp.com/vendors`,
        {}
      );
      setDsCarsVendors(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCarDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCar]);

  useEffect(() => {
    getDsCars();
    getDsCarsVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getDsCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    setdrivePrice(checked == true ? 500000 : 0);
  }, [checked]);

  return (
    <div>
      {/* <Header /> */}
      <div className=" flex justify-center justify-items-center pt-4  fixed shadow-lg  z-50 w-full bg-white">
        <Form form={form} className="flex items-center">
          <div className="w-24 mr-4">
            <img
              src="https://xehoangviet.galaxycloud.vn/template/xe_hoang_viet/images/logo.png"
              className="w-full"
              alt="logo"
            />
          </div>
          <div className=" grid grid-cols-5 mb-3 gap-10 ">
            <div>
              <Form.Item name="name" label={<span>Tên xe</span>}>
                <Input
                  placeholder="Nhập tên xe"
                  allowClear
                  onChange={(e) => setSearchName(e?.target?.value)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="vendor" label={<span>Tên hãng</span>}>
                <Select
                  placeholder="Chọn hãng xe"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={dsCarVendors?.map((e) => ({
                    ...e,
                    value: e?.id,
                    label: `${e?.code} - ${e?.name}`,
                  }))}
                  onChange={(value) => setSearchVender(value)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="seat" label={<span>Loại xe</span>}>
                <Select
                  showSearch
                  optionFilterProp="label"
                  placeholder="Chọn loại xe"
                  options={[
                    { value: "1", label: "4 chỗ" },
                    { value: "2", label: "7 chỗ" },
                    { value: "3", label: "16 chỗ" },
                  ]}
                  onChange={(value) => setSearchSeat(value)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="year" label={<span>Năm sản xuất</span>}>
                <Input
                  placeholder="Nhập năm sản xuất"
                  onChange={(e) => setSearchYear(e?.target?.value)}
                />
              </Form.Item>
            </div>
            <div style={{ marginTop: 30 }}>
              <Button
                style={{ backgroundColor: "green" }}
                type="primary"
                className="mr-2"
                // eslint-disable-next-line eqeqeq
                onClick={() => setSearch(search === true ? false : true)}
              >
                <div className="flex justify-end items-center ">
                  <HiOutlineSearch className="mr-2" /> <span>Tìm kiếm</span>
                </div>
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <Carousel autoplay>
          <div>
            <img
              src="https://hondagiaiphong.net/images/2018/Tin%20tuc/10.honda-viet-nam-cong-bo-gia-ban-le-moi/01-banner-top-gia-xe-oto-honda.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-o-to_103213258.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="https://honda-mydinh.com.vn/wp-content/uploads/2016/12/01-banner-top-xe-oto-honda-city-2018.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="http://hondaotohungyen.com/wp-content/uploads/2018/06/Xe-Honda-Odyssey-2016-tai-viet-nam-1088x403.png"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
        </Carousel>
      </div>
      <div className=" flex justify-center justify-items-center pb-12">
        <div className="w-4/5">
          <div className="flex justify-center mt-5 mb-5">
            <Typography
              className="text-4xl font-mono"
              style={{ fontFamily: "system-ui" }}
            >
              Dịch vụ thuê xe ô tô Mạnh Hiếu
            </Typography>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center">
                <Spin tip="Loading..."></Spin>
              </div>
            ) : (
              <div>
                {dsCars?.length > 0 ? (
                  <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-x-10">
                    {dsCars?.map((e, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-2 mt-10 border rounded-md shadow-sm px-3 py-4"
                        >
                          <div className="mr-2 ">
                            <img
                              className="rounded-md shadow-sm "
                              src={e?.url}
                              style={{ height: 250, width: 350 }}
                              alt="ảnh ô tô"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="text-2xl font-semibold">
                                {e?.name}
                              </p>
                              <p>{e?.shortDescription}</p>
                            </div>

                            <div>
                              <div className="inline-flex bg-red-200 py-1 px-3 mb-2">
                                <span className="text-base">
                                  Liên hệ: 0972314521
                                </span>
                              </div>
                              <br></br>
                              <Button
                                id={`btn-${index}`}
                                className="mr-2 !text-white !bg-green-500"
                                type="primary"
                                onClick={() => {
                                  setVisible(true);
                                  setIdCar(e?.id);
                                }}
                              >
                                <div className="flex justify-between items-center">
                                  <DoubleRightOutlined className="mr-2" />{" "}
                                  <span>Xem chi tiết</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Empty description={<span>Không có dữ liệu</span>}>
                    <Button type="primary" onClick={onRefresh}>
                      Làm mới
                    </Button>
                  </Empty>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {visible && (
        <Modal
          title="Thông tin chi tiết"
          width="1200px"
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setDays(1);
            setChecked(false);
          }}
          footer={false}
        >
          <div className=" border rounded-md shadow-sm px-3 py-4">
            {carDetail?.map((e) => {
              return (
                <div className="flex  ">
                  <div className="mr-10">
                    <Image
                      // className="rounded-md shadow-sm "
                      src={e?.url}
                      width={500}
                      alt="ảnh ô tô"
                    />
                  </div>
                  <div>
                    <div className=" flex justify-between w-48">
                      <span className="text-2xl font-semibold">{e?.name}</span>
                    </div>
                    <div className=" flex  ">
                      <div className="w-60">
                        <span>Hãng: </span>
                        <span className="text-base font-semibold">
                          {e?.vendorsName}
                        </span>
                      </div>
                      <div>
                        <span>Nắm sản xuất: </span>
                        <span className="text-base font-semibold">
                          {e?.year}
                        </span>
                      </div>
                    </div>
                    <div className=" flex  ">
                      <div className="w-60">
                        <span>Loại xe: </span>
                        <span className="text-base font-semibold">
                          {e?.seat} chỗ
                        </span>
                      </div>
                      <div>
                        <span>Biển số: </span>
                        <span className="text-base font-semibold">
                          {e?.licensePlates}
                        </span>
                      </div>
                    </div>
                    <p>Mô tả:</p>
                    <p>{e?.description}</p>
                    <div className="w-full">
                      <Checkbox
                        value={checked}
                        onChange={(e) => setChecked(e?.target?.checked)}
                      >
                        Thuê xe có lái
                      </Checkbox>
                      <Form className="grid grid-cols-2 gap-10">
                        <Form.Item label="Mức sử dụng xe">
                          <Select
                            defaultValue="1"
                            showSearch
                            optionFilterProp="label"
                            placeholder="Chọn mức sử dụng xe"
                            options={[
                              { value: "1", label: "Dưới 100Km/ngày" },
                              { value: "2", label: "100-250km/ ngày" },
                              { value: "3", label: "250km-500km/ngày" },
                              { value: "4", label: "Trên 500km/ngày" },
                            ]}
                            onSelect={(value) =>
                              setKmPrice(
                                // eslint-disable-next-line  eqeqeq
                                value == "1"
                                  ? 650000
                                  : // eslint-disable-next-line  eqeqeq
                                  value == "2"
                                  ? 900000
                                  : // eslint-disable-next-line  eqeqeq
                                  value == "3"
                                  ? 1100000
                                  : 1300000
                              )
                            }
                          />
                        </Form.Item>
                        <Form.Item label={<span>Số ngày muốn thuê</span>}>
                          <div className="flex w-4/6 items-center">
                            <Button
                              // eslint-disable-next-line  eqeqeq
                              disabled={days == 1}
                              size="small"
                              shape="circle"
                              icon={<HiOutlineMinusSm />}
                              onClick={() => setDays(days - 1)}
                            ></Button>
                            <span className="px-3">{days}</span>
                            <Button
                              size="small"
                              shape="circle"
                              icon={<HiPlusSm />}
                              onClick={() => setDays(days + 1)}
                            ></Button>
                          </div>
                        </Form.Item>
                        <></>
                      </Form>
                      <div className=" inline-block pr-2 py-1 text-2xl mt-2">
                        Giá thuê:{" "}
                        {(
                          (vendorPrice + kmPrice + typePrice + drivePrice) *
                          days
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        VNĐ
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="pl-10 mt-10 border-dashed border-2 pt-2">
              <h1 className="text-2xl">Liên hệ cho thuê xe</h1>
              <ul className="list-disc">
                <li>
                  <span className="font-bold mr-5">Địa chỉ:</span>Mai dịch, Cầu
                  Giấy, Hà Nội
                </li>
                <li>
                  <span className="font-bold mr-4">Hotline:</span>
                  0972.314.521
                </li>
                <li>
                  <span className="font-bold mr-6">Email:</span>{" "}
                  manhhieua1@gmail.com
                </li>
                <li>
                  <span className="font-bold mr-3">Website:</span>
                  <a href="kiem-thu-oto.herokuapp.com" className="">
                    kiem-thu-oto.herokuapp.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
      {loading ? null : <Footer />}
    </div>
  );
};

export default Home;
