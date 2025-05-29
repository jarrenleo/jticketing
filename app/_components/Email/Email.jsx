import {
  Tailwind,
  Html,
  Head,
  Body,
  Container,
  Img,
  Text,
  Link,
} from "@react-email/components";
import WhatsApp from "../icons/WhatsApp";
import Mail from "../icons/Mail";
import Facebook from "../icons/Facebook";
import Instagram from "../icons/Instagram";
import XiaoHongShu from "../icons/XiaoHongShu";

// const data = {
//   orderId: "123456",
//   orderDate: "29 May 2025",
//   paymentMethod: "Credit Card",
//   currency: "MYR",
//   totalAmount: 100,
//   lineItems: [
//     {
//       id: 1,
//       price: {
//         product: {
//           images: [],
//           description: "CAT 1. Section 1, Row 1. 19 Jul 2025.",
//         },
//       },
//       description: "G-Dragon - 2025 World Tour",
//       quantity: 2,
//     },
//     {
//       id: 2,
//       price: {
//         product: {
//           images: [],
//           description: "CAT 2. Section 2, Row 2. 19 Jul 2025.",
//         },
//       },
//       description: "G-Dragon - 2025 World Tour",
//       quantity: 1,
//     },
//   ],
//   customerEmail: "jls412365458@gmail.com",
// },
// }

export default function Email({ checkoutDetails }) {
  const {
    orderId,
    orderDate,
    paymentMethod,
    currency,
    totalAmount,
    lineItems,
    customerEmail,
  } = checkoutDetails;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-neutral-50 p-8 font-sans">
          <Container className="mx-auto max-w-[768px]">
            <table border="0" cellPadding="0" cellSpacing="0" className="mb-8">
              <tr>
                <td className="pr-2">
                  <Img
                    src="http://jticketing.com/logo.png"
                    height="24"
                    width="24"
                    alt="JTicketing logo"
                  />
                </td>
                <td>
                  <Text className="m-0 text-xl font-bold">JTicketing</Text>
                </td>
              </tr>
            </table>

            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td width="100%">
                  <Text className="mt-0 text-2xl font-bold">Order Details</Text>
                </td>
              </tr>
            </table>

            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td width="50%">
                  <Text className="m-0 text-sm text-stone-500">
                    Order Number
                  </Text>
                  <Text className="mb-4 mt-1 text-stone-950">{orderId}</Text>
                </td>

                <td width="50%">
                  <Text className="m-0 text-sm text-stone-500">Order Date</Text>
                  <Text className="mb-4 mt-1 text-stone-950">{orderDate}</Text>
                </td>
              </tr>

              <tr>
                <td width="50%">
                  <Text className="m-0 text-sm text-stone-500">
                    Payment Method
                  </Text>
                  <Text className="mb-4 mt-1 text-stone-950">
                    {paymentMethod}
                  </Text>
                </td>

                <td width="50%">
                  <Text className="m-0 text-sm text-neutral-500">
                    Total Amount
                  </Text>
                  <Text className="mb-4 mt-1 text-stone-950">
                    {currency} {totalAmount}
                  </Text>
                </td>
              </tr>
            </table>

            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td>
                  <Text className="text-2xl font-bold">Tickets Purchased</Text>
                </td>
              </tr>
            </table>

            {lineItems.map((item) => (
              <table
                key={item.id}
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                className="mb-4"
              >
                <tr>
                  <td width="100px">
                    <Img
                      src={item.price.product.images[0]}
                      alt={item.name}
                      height={48}
                      width={110.4}
                      style={{
                        borderRadius: "6px",
                      }}
                    />
                  </td>
                  <td className="pl-4">
                    <Text className="m-0 font-semibold text-stone-950">
                      {item.description}
                    </Text>
                    <Text className="m-0 text-sm text-stone-500">
                      {item.price.product.description}
                    </Text>
                    <Text className="m-0 text-sm text-stone-500">
                      {item.quantity} ticket{item.quantity > 1 ? "s" : ""}
                    </Text>
                  </td>
                </tr>
              </table>
            ))}

            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              className="my-8"
            >
              <tr>
                <td
                  style={{
                    border: "1px solid #e7e5e4",
                    borderRadius: "6px",
                  }}
                  className="p-6"
                >
                  <table
                    width="100%"
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tr>
                      <td>
                        <Text className="mt-0 text-2xl font-bold text-stone-950">
                          Need Help?
                        </Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          className="mb-4"
                        >
                          <tr>
                            <td width="50%" className="pr-2">
                              <Link
                                href={`https://wa.me/601165324028`}
                                style={{
                                  borderRadius: "6px",
                                }}
                                className="block w-full bg-[#3b82f6] py-2 text-center"
                              >
                                <WhatsApp
                                  width={14}
                                  height={14}
                                  className="mr-2 fill-stone-50"
                                />
                                <span className="text-sm font-medium text-stone-50">
                                  WhatsApp
                                </span>
                              </Link>
                            </td>
                            <td width="50%" className="pl-2">
                              <Link
                                href="mailto:jfaikicks@gmail.com"
                                style={{
                                  borderRadius: "6px",
                                }}
                                className="block w-full bg-[#3b82f6] py-2 text-center"
                              >
                                <Mail
                                  width={14}
                                  height={14}
                                  className="mr-2 stroke-stone-50"
                                />
                                <span className="text-sm font-medium text-stone-50">
                                  Email
                                </span>
                              </Link>
                            </td>
                          </tr>
                        </table>

                        <Text className="my-0 text-sm text-stone-500">
                          This email was sent to {customerEmail}. If you have
                          any questions about your order, please contact us with
                          your order number.
                        </Text>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <Text className="mb-2 text-center text-sm text-stone-500">
              &copy; {new Date().getFullYear()} JTicketing. All rights reserved.
            </Text>

            <table
              align="center"
              cellPadding="0"
              cellSpacing="0"
              className="mb-4 text-sm"
            >
              <tr>
                <td>
                  <Link
                    href="https://jticketing.com/about-us"
                    className="mr-1.5 text-stone-500"
                  >
                    About Us
                  </Link>
                </td>
                <td>
                  <Text className="my-0 mr-1.5 text-stone-500">|</Text>
                </td>
                <td>
                  <Link
                    href="https://jticketing.com/privacy"
                    className="mr-1.5 text-stone-500"
                  >
                    Privacy Policy
                  </Link>
                </td>
                <td>
                  <Text className="my-0 mr-1.5 text-stone-500">|</Text>
                </td>
                <td>
                  <Link
                    href="https://jticketing.com/terms"
                    className="text-stone-500"
                  >
                    Terms & Conditions
                  </Link>
                </td>
              </tr>
            </table>

            <table
              align="center"
              cellPadding="0"
              cellSpacing="0"
              className="text-sm"
            >
              <tr>
                <td>
                  <Link
                    href="https://www.facebook.com/jfaikicks"
                    className="mr-4"
                  >
                    <Facebook
                      height={24}
                      width={24}
                      className="fill-stone-500"
                    />
                  </Link>
                </td>
                <td>
                  <Link
                    href="https://www.instagram.com/jfaikicks"
                    className="mr-4"
                  >
                    <Instagram
                      height={24}
                      width={24}
                      className="fill-stone-500"
                    />
                  </Link>
                </td>
                <td>
                  <Link href="https://www.xiaohongshu.com/user/profile/60d82dbb0000000001006b13">
                    <XiaoHongShu
                      height={24}
                      width={24}
                      className="fill-stone-500"
                    />
                  </Link>
                </td>
              </tr>
            </table>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
