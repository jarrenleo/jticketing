import {
  Tailwind,
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Link,
  // ... any other components you might use from @react-email/components
} from "@react-email/tailwind"; // Or from "@react-email/components" and wrap with Tailwind
import { Mail } from "lucide-react";
import WhatsApp from "../icons/WhatsApp";
import Facebook from "../icons/Facebook";
import Instagram from "../icons/Instagram";
import XiaoHongShu from "../icons/XiaoHongShu";

export default function Email(checkoutDetails) {
  const {
    orderId,
    orderDate,
    paymentMethod,
    currency,
    totalAmount,
    lineItems,
    customerEmail,
  } = checkoutDetails;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="w-full bg-background p-8">
          <Container className="mx-auto max-w-[768px]">
            <Section className="mb-8 flex items-center gap-2">
              <Img
                src={`${siteUrl}/logo.png`}
                height="24"
                width="24"
                alt="JTicketing logo"
              />
              <Text className="text-xl font-bold">JTicketing</Text>
            </Section>

            <Section>
              <Card className="mb-4 w-full border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Order Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid gap-4 text-sm font-medium md:grid-cols-2">
                    <div className="space-y-0.5">
                      <Text className="text-muted-foreground">
                        Order Number
                      </Text>
                      <Text>{orderId}</Text>
                    </div>
                    <div className="space-y-0.5">
                      <Text className="text-muted-foreground">Order Date</Text>
                      <Text>{orderDate}</Text>
                    </div>
                    <div className="space-y-0.5">
                      <Text className="text-muted-foreground">
                        Payment Method
                      </Text>
                      <Text>{paymentMethod}</Text>
                    </div>
                    <div className="space-y-0.5">
                      <Text className="text-muted-foreground">
                        Total Amount
                      </Text>
                      <Text>
                        {currency} {totalAmount}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section>
              <Card className="mb-4 w-full border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Tickets Purchased
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="m-0 flex list-none flex-col gap-4 p-0 text-sm text-muted-foreground">
                    {lineItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-4">
                        <Img
                          src={item.price.product.images[0]}
                          height="48"
                          width="110"
                          alt={item.description}
                          className="rounded-md" // Tailwind class
                        />
                        <div className="flex flex-col gap-0.5">
                          <Text className="font-medium text-foreground">
                            {item.description}
                          </Text>
                          <Text className="text-xs text-muted-foreground">
                            {item.price.product.description}
                          </Text>
                          <Text className="text-xs text-muted-foreground">
                            {`${item.quantity} ${item.quantity === 1 ? "ticket" : "tickets"}`}
                          </Text>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Section>

            <Section className="mb-8 w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Section className="mb-4 flex gap-2">
                    <Link
                      href={`https://wa.me/601165324028`}
                      className="group flex w-full items-center justify-center gap-2 rounded-md border border-border py-2 text-center text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <WhatsApp
                        height={16}
                        width={16}
                        className="fill-current"
                      />
                      WhatsApp
                    </Link>
                    <Link
                      href={`mailto:jfaikicks@gmail.com`}
                      className="group flex w-full items-center justify-center gap-2 rounded-md border border-border py-2 text-center text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Mail height={16} width={16} className="stroke-current" />
                      Email
                    </Link>
                  </Section>
                  <Text className="text-sm text-muted-foreground">
                    This email was sent to {customerEmail}. If you have any
                    questions about your order, please contact our customer
                    support team with your order number.
                  </Text>
                </CardContent>
              </Card>
            </Section>

            <Section className="text-center text-sm text-muted-foreground">
              <Text className="mb-2">
                &copy; {new Date().getFullYear()} JTicketing. All rights
                reserved.
              </Text>
              <Section className="mb-2 flex items-center justify-center gap-1.5">
                <Link href={`${siteUrl}/about-us`} className="hover:underline">
                  About Us
                </Link>
                <Text className="text-xs text-muted-foreground">|</Text>
                <Link href={`${siteUrl}/privacy`} className="hover:underline">
                  Privacy Policy
                </Link>
                <Text className="text-xs text-muted-foreground">|</Text>
                <Link href={`${siteUrl}/terms`} className="hover:underline">
                  Terms & Conditions
                </Link>
              </Section>
              <Section className="flex items-center justify-center gap-4">
                <Link href="https://www.facebook.com/jfaikicks">
                  <Facebook
                    height={20}
                    width={20}
                    className="fill-muted-foreground transition-colors hover:fill-[#0866FF]"
                  />
                </Link>
                <Link href="https://www.instagram.com/jfaikicks">
                  <Instagram
                    height={20}
                    width={20}
                    className="fill-muted-foreground transition-colors hover:fill-[#FF0069]"
                  />
                </Link>
                <Link href="https://www.xiaohongshu.com/user/profile/60d82dbb0000000001006b13">
                  <XiaoHongShu
                    height={20}
                    width={20}
                    className="fill-muted-foreground transition-colors hover:fill-[#FF2442]"
                  />
                </Link>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
