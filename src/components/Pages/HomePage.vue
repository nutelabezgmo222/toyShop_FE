<template>
  <div class="mt-8 text-left">
    <div class="flex">
      <div class="mr-8 mb-8">
        <img
          class="max-w-2xl"
          :src="banner1"
          alt="Banner1">
      </div>
      <div>
        <h3
          class="mb-4 font-bold">
          Premium Quality Educational Children's Toys
        </h3>
        <p
          class="mb-4">
          Combining the high quality of classic heirloom toys with the convenience of ordering from online toy stores, Arolee USA offers products that can connect generations and last for years. These durable toys and games will provide hours of entertainment and help children learn through playtime.
        </p>
        <p>
          Arolee is a family-run company that has been in operation since 1938. We understand the value of bringing families together and items that last. As a company, we believe that children are the most important things in life. That's why it's our mission to create premium, educational children's toys to help kids grow into creative, imaginative people.
        </p>
      </div>
    </div>

    <div class="mb-8">
      <h3
        class="mb-4 font-bold">
        Featured Products
      </h3>
      <p
        class="mb-4">
        All of our online kids’ toys help children grow, last for years, and bring families together. But these are some that customers and staff alike have loved. We’ve featured just a few of our favorite toys and games for all ages to help point you in the right direction for your little one!
      </p>
      <p>
        If none of these children’s toys strike your fancy, feel free to reach out to us anytime. We pride ourselves on our superior customer service and would be happy to answer any questions about the design or creation of our products.
      </p>
    </div>

    <div class="flex flex-row-reverse">
      <div class="ml-8 mb-8">
        <img
          class="max-w-2xl"
          :src="banner2"
          alt="Banner2">
      </div>
      <div>
        <h3
          class="mb-4 font-bold">
          Premium Quality Educational Children's Toys
        </h3>
        <p>
          Combining the high quality of classic heirloom toys with the convenience of ordering from online toy stores, Arolee USA offers products that can connect generations and last for years. These durable toys and games will provide hours of entertainment and help children learn through playtime.
        </p>
      </div>
    </div>

    <div class="flex justify-center mb-8">
      <img
        class="max-w-4xl"
        :src="banner3"
        alt="Bamner3">
    </div>

    <div>
      <h3
        class="mb-4 font-bold">
        We Don’t Just Sell Toys!
      </h3>
      <p
        class="mb-4">
        We offer phenomenal collections of kids’ toys online that encourage early development, promote learning, and stimulate the imagination. At HABA, you can buy toys and games for all age groups that the whole family will love!
      </p>
      <p>
        Our family-owned and operated German toy company has been creating educational and fun children’s toys and games for over 80 years. We have impressive selections of quality toys for babies, toddlers, and children.
      </p>
    </div>
  </div>
</template>

<script>
import Banner1 from "@/assets/images/Banner1.png";
import Banner2 from "@/assets/images/Banner2.png";
import Banner3 from "@/assets/images/Banner3.png";

export default {
    name: 'Home',
    data() {
        return {
            banner1: Banner1,
            banner2: Banner2,
            banner3: Banner3,
        }
    }
};
</script>