import { Card, Image, Text, Button, createStyles } from "@mantine/core"
import poster from "../../images/poster-na.svg"

type CardComponentProps = {
  title: string
  image: string
  year: string
  btnText: string
  movieId: string
}

const useStyles = createStyles((theme) => ({
  cardContentWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  cardTextContentWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardText: {
    flexGrow: 1,
  },
}))

export const CardComponent = ({ title, image, year, btnText }: CardComponentProps) => {
  const { classes } = useStyles()

  return (
    <>
      <Card shadow="sm" p="lg" radius="md" className={classes.cardContentWrapper}>
        <Card.Section>
          <Image src={image === "N/A" ? poster : image} height={220} alt="Movie poster" />
        </Card.Section>

        <div className={classes.cardTextContentWrapper}>
          <div className={classes.cardText}>
            <Text weight={500} mt="sm">
              {title}
            </Text>
            <Text size="sm" color="dimmed" mt="sm">
              Year: {year}
            </Text>
          </div>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            {btnText}
          </Button>
        </div>
      </Card>
    </>
  )
}
